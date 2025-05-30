import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Service } from './models/service.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateServiceInput } from './dto/createService.input';
import { DeploymentService } from 'src/deployment/deployment.service';
import { ServiceWithDeployment } from './dto/serviceWithDeployment.response';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: ReturnModelType<typeof Service>,
    private readonly deploymentService: DeploymentService,
  ) {}

  async getProjectServices(
    projectId: string,
  ): Promise<ServiceWithDeployment[]> {
    const services = await this.serviceModel.find({ projectId });

    const servicesWithDeployments = await Promise.all(
      services.map(async (service) => {
        const [activeDeployment, draftDeployment] =
          await this.deploymentService.getActiveAndDraftDeployments(
            service._id,
          );
        return {
          ...service.toObject(),
          activeDeployment: activeDeployment
            ? activeDeployment.toObject()
            : null,
          draftDeployment: draftDeployment ? draftDeployment.toObject() : null,
        };
      }),
    );

    return servicesWithDeployments;
  }

  async getServiceById(id: string): Promise<ServiceWithDeployment> {
    const service = await this.serviceModel.findById(id);
    const [activeDeployment, draftDeployment] =
      await this.deploymentService.getActiveAndDraftDeployments(service._id);
    return {
      ...service.toObject(),
      activeDeployment: activeDeployment ? activeDeployment.toObject() : null,
      draftDeployment: draftDeployment ? draftDeployment.toObject() : null,
    };
  }

  async createService(input: CreateServiceInput) {
    const service = await this.serviceModel.create(input);

    await this.deploymentService.createDeployment({
      serviceId: service._id,
      config: input.config,
    });
    return true;
  }
}
