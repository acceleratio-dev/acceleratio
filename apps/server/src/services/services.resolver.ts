import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceInput } from './dto/create-service.input';
import { Service } from './entities/service.entity';
import { UpdateServiceInput } from './dto/update-service.input';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { ServiceDeploymentEventMessage } from './dto/service-deployment-event.message';
import { UpdateServiceDeploymentInput } from './dto/update-service-deployment.input';
import { ServiceDeployment } from './entities/service-deployment.entity';

@Resolver()
export class ServicesResolver {
  constructor(
    private readonly servicesService: ServicesService,
    @Inject('DEPLOYMENTS_PUB_SUB') private readonly deploymentsPubSub: PubSub,
  ) {}

  @Query(() => [Service])
  getServicesByProjectId(@Args('projectId') projectId: string) {
    return this.servicesService.getServicesByProjectId(projectId);
  }

  @Query(() => Service)
  getServiceById(@Args('id') id: string) {
    return this.servicesService.getServiceById(id);
  }

  @Mutation(() => Service)
  updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
    return this.servicesService.updateService(updateServiceInput);
  }

  @Mutation(() => Service)
  createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
    return this.servicesService.createService(createServiceInput);
  }

  @Query(() => [ServiceDeployment])
  getServiceDeployments(@Args('serviceId') serviceId: string) {
    return this.servicesService.getServiceDeployments(serviceId);
  }

  @Mutation(() => ServiceDeployment)
  updateServiceDeployment(
    @Args('updateServiceDeploymentInput') updateServiceDeploymentInput: UpdateServiceDeploymentInput,
  ) {
    return this.servicesService.updateServiceDeployment(updateServiceDeploymentInput);
  }

  @Subscription(() => ServiceDeploymentEventMessage, {
    resolve: (value) => value,
    filter: (payload, variables) => payload.deployment.serviceId === variables.serviceId,
  })
  serviceDeployments(@Args('serviceId') serviceId: string) {
    return this.deploymentsPubSub.asyncIterableIterator(`serviceDeployments:${serviceId}`);
  }

  @Mutation(() => Boolean)
  deployService(@Args('serviceId') serviceId: string) {
    return this.servicesService.deployService(serviceId);
  }

  @Mutation(() => Boolean)
  stopService(@Args('serviceId') serviceId: string) {
    return this.servicesService.stopService(serviceId);
  }

  @Query(() => [String])
  getPodLogs(@Args('podName') podName: string, @Args('serviceId') serviceId: string) {
    return this.servicesService.getPodLogs(podName, serviceId);
  }

  @Mutation(() => Boolean)
  restartPod(@Args('podName') podName: string, @Args('serviceId') serviceId: string) {
    return this.servicesService.restartPod(podName, serviceId);
  }
}
