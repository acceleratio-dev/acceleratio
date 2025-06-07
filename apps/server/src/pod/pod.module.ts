import { Module } from '@nestjs/common';
import { PodService } from './pod.service';
import { PodResolver } from './pod.resolver';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pod } from './entities/pod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pod])],
  providers: [PodResolver, PodService, KubernetesService],
})
export class PodModule {}
