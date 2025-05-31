import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Deployment, DeploymentStatus } from './models/deployment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AssignDomainInput } from './dto/assignDomain.input';
import { DeploymentService } from './deployment.service';
import { DomainInput, DomainStatus } from './models/domain.model';

@Injectable()
export class DeploymentDomainService {
  constructor(
    @InjectModel(Deployment)
    private readonly deploymentModel: ReturnModelType<typeof Deployment>,
    @Inject(forwardRef(() => DeploymentService))
    private readonly deploymentService: DeploymentService,
  ) {}

  async assignDomain(input: AssignDomainInput) {
    const latestDeployment = await this.deploymentService.getLatestDeployment(
      input.serviceId,
    );

    if (
      !latestDeployment ||
      latestDeployment.status === DeploymentStatus.FINISHED
    ) {
      throw new Error('Deployment not found or finished');
    }

    if (latestDeployment.status === DeploymentStatus.DRAFT) {
      await this.deploymentModel.updateOne(
        { _id: latestDeployment._id },
        {
          $push: {
            'config.domains': {
              ...input.domain,
              status: DomainStatus.VERIFYING,
            },
          },
        },
      );

      return true;
    }

    await this.deploymentModel.create({
      serviceId: latestDeployment.serviceId,
      status: DeploymentStatus.DRAFT,
      containerStatus: null,
      config: {
        ...latestDeployment.config,
        domains: [
          ...(latestDeployment.config.domains || []),
          {
            domain: input.domain.domain,
            path: input.domain.path,
            port: input.domain.port,
          },
        ],
      },
    });

    return true;
  }

  async generateLabels(input: DomainInput[]) {
    const labels = {
      'traefik.enable': 'true',
      'traefik.swarm': 'true',
      'traefik.swarm.exposedByDefault': 'false',
      'traefik.swarm.network': 'acceleratio_traefik-public',
      'traefik.swarm.endpoint': 'tcp://127.0.0.1:2377',
      'traefik.http.middlewares.redirect-to-https.redirectscheme.scheme':
        'https',
      'traefik.http.middlewares.redirect-to-https.redirectscheme.permanent':
        'true',
    };

    // Handle multiple domains by creating unique router names
    for (let i = 0; i < input.length; i++) {
      const domain = input[i];
      const routerName = input.length === 1 ? 'server' : `server-${i}`;

      // Build the rule with domain and optional path
      let rule = `Host(\`${domain.domain}\`)`;
      if (domain.path) {
        rule += ` && PathPrefix(\`${domain.path}\`)`;
      }

      // HTTP router (redirects to HTTPS)
      labels[`traefik.http.routers.${routerName}.entrypoints`] = 'web';
      labels[`traefik.http.routers.${routerName}.middlewares`] =
        'redirect-to-https';
      labels[`traefik.http.routers.${routerName}.rule`] = rule;

      // HTTPS router (main router)
      labels[`traefik.http.routers.${routerName}-secure.entrypoints`] =
        'websecure';
      labels[`traefik.http.routers.${routerName}-secure.tls.certresolver`] =
        'letsencrypt';
      labels[`traefik.http.routers.${routerName}-secure.rule`] = rule;

      // Service configuration (port)
      labels[`traefik.http.services.${routerName}.loadbalancer.server.port`] =
        domain.port.toString();
    }

    return labels;
  }
}
