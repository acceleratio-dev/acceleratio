import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { UpdateServiceDeploymentInput } from './dto/update-service-deployment.input';
import { ServiceDeployment, ServiceDeploymentStatus } from './entities/service-deployment.entity';
import { PubSub } from 'graphql-subscriptions';
import { ServiceDeploymentEventType } from './dto/service-deployment-event.message';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { EnvironmentVariablesService } from 'src/environment-variables/environment-variables.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceDeployment)
    private readonly serviceDeploymentRepository: Repository<ServiceDeployment>,
    private readonly projectsService: ProjectsService,
    @Inject('DEPLOYMENTS_PUB_SUB') private readonly deploymentsPubSub: PubSub,
    private readonly kubernetesService: KubernetesService,
    private readonly environmentVariablesService: EnvironmentVariablesService,
  ) {}

  async getServicesByProjectId(projectId: string): Promise<Service[]> {
    return this.serviceRepository.find({ where: { projectId } });
  }

  async getServiceById(id: string): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id }, relations: ['project'] });
  }

  async updateService(updateServiceInput: UpdateServiceInput): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id: updateServiceInput.serviceId } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return this.serviceRepository.save({ ...service, ...updateServiceInput });
  }

  async createService(createServiceInput: CreateServiceInput): Promise<Service> {
    const project = await this.projectsService.findOne(createServiceInput.projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const service = this.serviceRepository.create({
      ...createServiceInput,
      projectId: project.id,
    });
    return this.serviceRepository.save(service);
  }

  async getServiceDeployments(serviceId: string): Promise<ServiceDeployment[]> {
    return this.serviceDeploymentRepository.find({
      where: { serviceId },
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async updateServiceDeployment(updateServiceDeployment: UpdateServiceDeploymentInput) {
    const service = await this.serviceRepository.findOne({ where: { id: updateServiceDeployment.serviceId } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const latestDeployment = await this.serviceDeploymentRepository.findOne({
      where: { serviceId: updateServiceDeployment.serviceId },
      order: { createdAt: 'DESC' },
    });

    if (!latestDeployment || latestDeployment.status === ServiceDeploymentStatus.FINISHED) {
      const newDeployment = await this.serviceDeploymentRepository.save({
        serviceId: service.id,
        provider: updateServiceDeployment.provider,
        internalName: updateServiceDeployment.internalName,
        image: updateServiceDeployment.image,
        replicas: updateServiceDeployment.replicas,
        status: ServiceDeploymentStatus.DRAFT,
      });
      this.deploymentsPubSub.publish(`serviceDeployments:${service.id}`, {
        event_type: ServiceDeploymentEventType.DEPLOYMENT_CREATED,
        deployment: newDeployment,
      });
      return newDeployment;
    }

    if (latestDeployment.status === ServiceDeploymentStatus.DRAFT) {
      const updatedDeployment = await this.serviceDeploymentRepository.save({
        ...latestDeployment,
        ...updateServiceDeployment,
        updatedAt: undefined,
      });
      this.deploymentsPubSub.publish(`serviceDeployments:${service.id}`, {
        event_type: ServiceDeploymentEventType.DEPLOYMENT_UPDATED,
        deployment: updatedDeployment,
      });
      return updatedDeployment;
    }

    const newDeployment = await this.serviceDeploymentRepository.save({
      ...latestDeployment,
      ...updateServiceDeployment,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      status: ServiceDeploymentStatus.DRAFT,
    });
    this.deploymentsPubSub.publish(`serviceDeployments:${service.id}`, {
      event_type: ServiceDeploymentEventType.DEPLOYMENT_CREATED,
      deployment: newDeployment,
    });
    return newDeployment;
  }

  async deployService(serviceId: string) {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
      relations: ['project'],
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const latestDeployment = await this.serviceDeploymentRepository.findOne({
      where: { serviceId },
      order: { createdAt: 'DESC' },
    });

    if (!latestDeployment) {
      throw new NotFoundException('Deployment not found');
    }

    const kubernetesDeployment = await this.kubernetesService.getDeploymentByServiceId(
      service.project.kubernetesNamespace,
      serviceId,
    );

    if (
      latestDeployment.status === ServiceDeploymentStatus.ACTIVE &&
      kubernetesDeployment &&
      kubernetesDeployment.spec.replicas === latestDeployment.replicas
    ) {
      throw new BadRequestException('Service is already deployed');
    }

    const namespace = service.project.kubernetesNamespace;

    const environmentVariables = await this.environmentVariablesService.getServiceEnvironmentVariables(serviceId);

    if (kubernetesDeployment) {
      await this.kubernetesService.updateDeployment(namespace, latestDeployment, serviceId, environmentVariables);
    } else {
      await this.kubernetesService.createDeployment(namespace, latestDeployment);
    }

    if (latestDeployment.status === ServiceDeploymentStatus.DRAFT) {
      const activeDeployment = await this.serviceDeploymentRepository.findOne({
        where: { serviceId, status: ServiceDeploymentStatus.ACTIVE },
      });

      if (activeDeployment) {
        await this.serviceDeploymentRepository.update(activeDeployment.id, {
          status: ServiceDeploymentStatus.FINISHED,
        });
        this.deploymentsPubSub.publish(`serviceDeployments:${service.id}`, {
          event_type: ServiceDeploymentEventType.DEPLOYMENT_UPDATED,
          deployment: activeDeployment,
        });
      }
    }

    latestDeployment.status = ServiceDeploymentStatus.ACTIVE;

    await this.serviceDeploymentRepository.update(
      {
        serviceId,
        status: ServiceDeploymentStatus.ACTIVE,
      },
      {
        status: ServiceDeploymentStatus.FINISHED,
      },
    );

    await this.serviceDeploymentRepository.save(latestDeployment);

    this.deploymentsPubSub.publish(`serviceDeployments:${service.id}`, {
      event_type: ServiceDeploymentEventType.DEPLOYMENT_DEPLOYED,
      deployment: latestDeployment,
    });

    return true;
  }

  async stopService(serviceId: string) {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId }, relations: ['project'] });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const latestDeployment = await this.serviceDeploymentRepository.findOne({
      where: { serviceId },
      order: { createdAt: 'DESC' },
    });

    if (!latestDeployment) {
      throw new NotFoundException('Deployment not found');
    }

    const kubernetesDeployment = await this.kubernetesService.getDeploymentByServiceId(
      service.project.kubernetesNamespace,
      serviceId,
    );

    if (!kubernetesDeployment || kubernetesDeployment.spec.replicas === 0) {
      throw new NotFoundException('Deployment is already not running');
    }

    await this.kubernetesService.stopDeployment(
      service.project.kubernetesNamespace,
      kubernetesDeployment.metadata.name,
    );

    return true;
  }

  async getPodLogs(podName: string, serviceId: string) {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId }, relations: ['project'] });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return this.kubernetesService.getPodLogs(service.project.kubernetesNamespace, podName);
  }

  async restartPod(podName: string, serviceId: string) {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId }, relations: ['project'] });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return this.kubernetesService.restartPod(service.project.kubernetesNamespace, podName);
  }
}
