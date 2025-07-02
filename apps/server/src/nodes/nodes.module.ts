import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesResolver } from './nodes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEntity } from './entities/node.entity';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity]), KubernetesModule],
  providers: [NodesResolver, NodesService],
})
export class NodesModule {}
