import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { Pod } from './dto/pod.object';
import { PubSub } from 'graphql-subscriptions';
import { PodMessage } from './dto/pod.message';

@Resolver()
export class KubernetesResolver {
  constructor(
    private readonly kubernetesService: KubernetesService,
    @Inject('PODS_PUBSUB') private readonly podsPubSub: PubSub,
  ) {}

  @Query(() => [Pod])
  async getServicePods(@Args('serviceId') serviceId: string) {
    return this.kubernetesService.getServicePods(serviceId);
  }

  @Subscription(() => PodMessage, {
    resolve: (value) => value,
  })
  servicePods(@Args('serviceId') serviceId: string) {
    return this.podsPubSub.asyncIterableIterator(`pods:${serviceId}`);
  }
}
