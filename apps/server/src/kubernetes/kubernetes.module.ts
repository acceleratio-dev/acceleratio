import { Module } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { KubernetesResolver } from './kubernetes.resolver';
import { PubSub } from 'graphql-subscriptions';
import { KubernetesNetworksService } from './kubernetes-networks.service';
import { KubernetesConfigsService } from './kubernetes-configs.service';

const podsPubSub = new PubSub();

@Module({
  providers: [
    KubernetesResolver,
    KubernetesService,
    KubernetesNetworksService,
    KubernetesConfigsService,
    {
      provide: 'PODS_PUBSUB',
      useValue: podsPubSub,
    },
  ],
  exports: [KubernetesService, KubernetesNetworksService],
})
export class KubernetesModule {}
