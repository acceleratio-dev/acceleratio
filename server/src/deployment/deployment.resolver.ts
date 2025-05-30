import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { DeploymentService } from './deployment.service';
import { Deployment } from './models/deployment.model';
import { DeploymentConfigUpdateInput } from './models/deploymentConfig.model';
import { AssignDomainInput } from './dto/assignDomain.input';
import { DeploymentDomainService } from './deployment-domain.service';

@Resolver()
export class DeploymentResolver {
  constructor(
    private readonly deploymentService: DeploymentService,
    private readonly deploymentDomainService: DeploymentDomainService,
  ) {}

  @Query(() => [Deployment], {
    name: 'getServiceDeployments',
  })
  async getServiceDeployments(
    @Args('serviceId') serviceId: string,
  ): Promise<Deployment[]> {
    return this.deploymentService.getServiceDeployments(serviceId);
  }

  @Mutation(() => Boolean, {
    name: 'startService',
  })
  async startService(@Args('serviceId') serviceId: string) {
    return this.deploymentService.startService(serviceId);
  }

  @Mutation(() => Boolean, {
    name: 'stopService',
  })
  async stopService(@Args('serviceId') serviceId: string) {
    return this.deploymentService.stopService(serviceId);
  }

  @Mutation(() => Boolean, {
    name: 'updateServiceConfig',
  })
  async updateServiceConfig(
    @Args('serviceId') serviceId: string,
    @Args('config') config: DeploymentConfigUpdateInput,
  ) {
    return this.deploymentService.updateConfig(serviceId, config);
  }

  @Mutation(() => Boolean, {
    name: 'assignDomain',
  })
  async assignDomain(@Args('input') input: AssignDomainInput) {
    return this.deploymentDomainService.assignDomain(input);
  }
}
