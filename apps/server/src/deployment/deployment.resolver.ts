import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeploymentService } from './deployment.service';

@Resolver('Deployment')
export class DeploymentResolver {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Mutation(() => Boolean, {
    name: 'startServiceDeployment',
  })
  async startServiceDeployment(@Args('serviceId') serviceId: string) {
    await this.deploymentService.startServiceDeployment(serviceId);
    return true;
  }

  @Mutation(() => Boolean, {
    name: 'stopServiceDeployment',
  })
  async stopServiceDeployment(@Args('serviceId') serviceId: string) {
    await this.deploymentService.stopServiceDeployment(serviceId);
    return true;
  }
}
