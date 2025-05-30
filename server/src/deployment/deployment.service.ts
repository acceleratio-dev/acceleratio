import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ContainerStatus, Deployment } from './models/deployment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateDeploymentInput } from './dto/createDeployment.input';
import { DeploymentStatus } from './models/deployment.model';
import { DockerService } from 'src/docker/docker.service';
import { DeploymentConfigUpdateInput } from './models/deploymentConfig.model';

@Injectable()
export class DeploymentService {
  constructor(
    @InjectModel(Deployment)
    private readonly deploymentModel: ReturnModelType<typeof Deployment>,
    private readonly dockerService: DockerService,
  ) {}

  async createDeployment(input: CreateDeploymentInput) {
    const deployment = await this.deploymentModel.create(input);
    return deployment;
  }

  async getServiceDeployments(serviceId: string): Promise<Deployment[]> {
    return this.deploymentModel.find({ serviceId }).sort({ createdAt: -1 });
  }

  async getLatestDeployment(serviceId: string) {
    return this.deploymentModel
      .findOne({
        serviceId,
        status: { $in: [DeploymentStatus.ACTIVE, DeploymentStatus.DRAFT] },
      })
      .sort({ createdAt: -1 })
      .limit(1);
  }

  async getActiveAndDraftDeployments(serviceId: string) {
    const activeDeployment = await this.deploymentModel.findOne({
      serviceId,
      status: DeploymentStatus.ACTIVE,
    });

    const draftDeployment = await this.deploymentModel.findOne({
      serviceId,
      status: DeploymentStatus.DRAFT,
    });

    return [activeDeployment, draftDeployment];
  }

  async startService(serviceId: string) {
    const latestDeployment = await this.getLatestDeployment(serviceId);

    if (!latestDeployment) {
      throw new Error('Service not found');
    }

    if (
      latestDeployment.status === DeploymentStatus.ACTIVE &&
      latestDeployment.containerStatus !== ContainerStatus.STOPPED &&
      latestDeployment.containerId !== null
    ) {
      throw new Error('Service already deployed');
    }

    const containerId = await this.dockerService.createService({
      serviceId,
      deploymentId: latestDeployment._id,
      config: latestDeployment.config,
    });

    await this.deploymentModel.updateOne(
      { _id: latestDeployment._id },
      {
        $set: {
          status: DeploymentStatus.ACTIVE,
          containerStatus: ContainerStatus.PENDING,
          containerId,
        },
      },
    );

    return true;
  }

  async stopService(serviceId: string) {
    const latestDeployment = await this.getLatestDeployment(serviceId);

    if (!latestDeployment) {
      throw new Error('Service not found');
    }

    if (
      latestDeployment.status !== DeploymentStatus.ACTIVE ||
      latestDeployment.containerStatus === ContainerStatus.STOPPED ||
      latestDeployment.containerId === null
    ) {
      throw new Error('Service not active');
    }

    await this.dockerService.deleteService(latestDeployment.containerId);

    await this.deploymentModel.updateOne(
      { _id: latestDeployment._id },
      {
        $set: {
          containerId: null,
        },
      },
    );

    return true;
  }

  async updateConfig(serviceId: string, config: DeploymentConfigUpdateInput) {
    const latestDeployment = await this.getLatestDeployment(serviceId);

    if (latestDeployment.status === DeploymentStatus.ACTIVE) {
      await this.createDeployment({
        serviceId: latestDeployment.serviceId,
        config: {
          ...latestDeployment.config,
          ...config,
        },
      });
    } else {
      await this.deploymentModel.updateOne(
        { _id: latestDeployment._id },
        { $set: { config } },
      );
    }

    return true;
  }

  async updateDeploymentContainerStatus(
    deploymentId: string,
    containerStatus: ContainerStatus,
  ) {
    await this.deploymentModel.updateOne(
      { _id: deploymentId },
      { $set: { containerStatus } },
    );
  }
}
