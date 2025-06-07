import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { DeploymentService } from 'src/deployment/deployment.service';
import { DeploymentStatus } from 'src/deployment/entities/deployment.entity';
import { ServiceWithDeployments } from './dto/service-with-deployments.object';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly deploymentService: DeploymentService,
  ) {}

  async createService(createServiceInput: CreateServiceInput) {
    const service = this.serviceRepository.create({
      name: createServiceInput.name,
      projectId: createServiceInput.projectId,
    });

    const savedService = await this.serviceRepository.save(service);

    await this.deploymentService.createDeployment({
      serviceId: savedService.id,
      name: savedService.name,
      provider: createServiceInput.deploymentProvider,
      config: createServiceInput.config,
      status: DeploymentStatus.DRAFT,
    });

    return savedService;
  }

  async getServicesByProjectId(
    projectId: string,
  ): Promise<ServiceWithDeployments[]> {
    const services = await this.serviceRepository.find({
      where: { projectId },
      relations: {
        deployments: true,
      },
      relationLoadStrategy: 'query',
    });

    const serviceIds = services.map((s) => s.id);
    const deployments =
      await this.deploymentService.getActiveAndDraftDeploymentsForServices(
        serviceIds,
      );

    return services.map((service) => {
      const serviceDeployments = deployments[service.id] || [];
      const activeDeployment = serviceDeployments.find(
        (d) => d.status === DeploymentStatus.ACTIVE,
      );
      const draftDeployment = serviceDeployments.find(
        (d) => d.status === DeploymentStatus.DRAFT,
      );

      return {
        ...service,
        activeDeployment,
        draftDeployment,
      };
    });
  }
}
