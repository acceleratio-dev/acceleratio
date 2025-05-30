import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Deployment, DeploymentStatus } from './models/deployment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AssignDomainInput } from './dto/assignDomain.input';
import { DeploymentService } from './deployment.service';

@Injectable()
export class DeploymentDomainService {
  constructor(
    @InjectModel(Deployment)
    private readonly deploymentModel: ReturnModelType<typeof Deployment>,
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
          $push: { 'config.domains': input.domain },
        },
      );
    }
    return true;
  }
}
