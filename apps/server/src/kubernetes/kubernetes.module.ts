import { Module } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { KubernetesResolver } from './kubernetes.resolver';
import { PubSub } from 'graphql-subscriptions';
import { KubernetesNetworksService } from './kubernetes-networks.service';
import { KubernetesConfigsService } from './kubernetes-configs.service';
import { KubernetesNodesService } from './kubernetes-nodes.service';

const podsPubSub = new PubSub();

@Module({
  providers: [
    KubernetesResolver,
    KubernetesService,
    KubernetesNetworksService,
    KubernetesConfigsService,
    KubernetesNodesService,
    {
      provide: 'PODS_PUBSUB',
      useValue: podsPubSub,
    },
  ],
  exports: [KubernetesService, KubernetesNetworksService, KubernetesNodesService],
})
export class KubernetesModule {}
