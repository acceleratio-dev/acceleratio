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
      'traefik.http.routers.server.entrypoints': 'web',
      'traefik.http.routers.server.middlewares': 'redirect-to-https',
      'traefik.http.routers.server-secure.entrypoints': 'websecure',
      'traefik.http.routers.server-secure.tls.certresolver': 'letsencrypt',
      'traefik.http.middlewares.redirect-to-https.redirectscheme.scheme':
        'https',
      'traefik.http.middlewares.redirect-to-https.redirectscheme.permanent':
        'true',
      'traefik.docker.network': 'traefik-public',
    };

    for (const domain of input) {
      labels[`traefik.http.routers.server.rule`] = `Host("${domain.domain}")`;
      labels[
        `traefik.http.routers.server-secure.rule`
      ] = `Host("${domain.domain}")`;
      labels[`traefik.http.services.server.loadbalancer.server.port`] =
        domain.port.toString();
      if (domain.path) {
        labels[
          'traefik.http.routers.server.rule'
        ] = `Host("${domain.domain}") && PathPrefix("${domain.path}")`;
      }
    }

    return labels;
  }
}
