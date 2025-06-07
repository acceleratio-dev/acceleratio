import { Module } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { KubernetesResolver } from './kubernetes.resolver';

@Module({
  providers: [KubernetesResolver, KubernetesService],
  exports: [KubernetesService],
})
export class KubernetesModule {}
