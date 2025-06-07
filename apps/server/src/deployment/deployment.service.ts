import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deployment, DeploymentStatus } from './entities/deployment.entity';
import { DeploymentInput } from './dto/deployment.input';
import { In } from 'typeorm';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';

@Injectable()
export class DeploymentService {
  constructor(
    @InjectRepository(Deployment)
    private readonly deploymentRepository: Repository<Deployment>,
    private readonly kubernetesService: KubernetesService,
  ) {}

  async createDeployment(createDeploymentInput: DeploymentInput) {
    const deployment = this.deploymentRepository.create(createDeploymentInput);
    return this.deploymentRepository.save(deployment);
  }

  private async getLatestDeployment(serviceId: string, isActive?: boolean) {
    return this.deploymentRepository.findOne({
      where: {
        serviceId,
        status: isActive ? DeploymentStatus.ACTIVE : undefined,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveAndDraftDeployments(serviceId: string) {
    const deployments = await this.deploymentRepository.find({
      where: {
        serviceId,
        status: In([DeploymentStatus.ACTIVE, DeploymentStatus.DRAFT]),
      },
    });

    return {
      activeDeployment: deployments.find(
        (d) => d.status === DeploymentStatus.ACTIVE,
      ),
      draftDeployment: deployments.find(
        (d) => d.status === DeploymentStatus.DRAFT,
      ),
    };
  }

  async getActiveAndDraftDeploymentsForServices(
    serviceIds: string[],
  ): Promise<Record<string, Deployment[]>> {
    const deployments = await this.deploymentRepository.find({
      where: {
        serviceId: In(serviceIds),
        status: In([DeploymentStatus.ACTIVE, DeploymentStatus.DRAFT]),
      },
    });

    return deployments.reduce((acc, deployment) => {
      if (!acc[deployment.serviceId]) {
        acc[deployment.serviceId] = [];
      }
      acc[deployment.serviceId].push(deployment);
      return acc;
    }, {} as Record<string, Deployment[]>);
  }

  async startServiceDeployment(serviceId: string) {
    const latestDeployment = await this.getLatestDeployment(serviceId);

    if (
      !latestDeployment ||
      latestDeployment.status === DeploymentStatus.FINISHED
    ) {
      throw new Error('No deployment found');
    }

    if (latestDeployment.status === DeploymentStatus.DRAFT) {
      const createdDeployment = await this.kubernetesService.createDeployment(
        latestDeployment.config,
        'default',
      );
      await this.deploymentRepository.update(latestDeployment.id, {
        status: DeploymentStatus.ACTIVE,
        kubernetesName: createdDeployment.metadata.name,
      });
      return createdDeployment;
    }

    if (latestDeployment.kubernetesName) {
      throw new Error('Deployment already deployed');
    }

    const createdDeployment = await this.kubernetesService.createDeployment(
      latestDeployment.config,
      'default',
    );
    await this.deploymentRepository.update(latestDeployment.id, {
      status: DeploymentStatus.ACTIVE,
      kubernetesName: createdDeployment.metadata.name,
    });

    return true;
  }

  async stopServiceDeployment(serviceId: string) {
    const latestDeployment = await this.getLatestDeployment(serviceId, true);
    if (!latestDeployment) {
      throw new Error('No deployment found');
    }

    if (!latestDeployment.kubernetesName) {
      throw new Error('Deployment already stopped');
    }

    await this.kubernetesService.deleteDeployment(
      latestDeployment.kubernetesName,
      'default',
    );
    await this.deploymentRepository.update(latestDeployment.id, {
      kubernetesName: null,
    });

    return true;
  }
}
