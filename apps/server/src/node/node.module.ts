import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './entities/node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  providers: [NodeResolver, NodeService, KubernetesService],
})
export class NodeModule {}
