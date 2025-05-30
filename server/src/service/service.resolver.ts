import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { CreateServiceInput } from './dto/createService.input';
import { ServiceWithDeployment } from './dto/serviceWithDeployment.response';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Query(() => [ServiceWithDeployment])
  async getProjectServices(@Args('projectId') projectId: string) {
    return this.serviceService.getProjectServices(projectId);
  }

  @Query(() => ServiceWithDeployment)
  async getServiceById(@Args('id') id: string) {
    return this.serviceService.getServiceById(id);
  }

  @Mutation(() => Boolean)
  async createService(@Args('input') input: CreateServiceInput) {
    return this.serviceService.createService(input);
  }
}
