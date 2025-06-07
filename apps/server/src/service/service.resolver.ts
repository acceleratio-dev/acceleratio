import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { CreateServiceInput } from './dto/create-service.input';
import { Service } from './entities/service.entity';
import { ServiceWithDeployments } from './dto/service-with-deployments.object';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => Service)
  async createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.createService(createServiceInput);
  }

  @Query(() => [ServiceWithDeployments], { name: 'getProjectServices' })
  async getProjectServices(@Args('projectId') projectId: string) {
    return this.serviceService.getServicesByProjectId(projectId);
  }
}
