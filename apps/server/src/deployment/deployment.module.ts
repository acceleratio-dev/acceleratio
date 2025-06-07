import { Module } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { DeploymentResolver } from './deployment.resolver';
import { Deployment } from './entities/deployment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Deployment]), KubernetesModule],
  providers: [DeploymentResolver, DeploymentService],
  exports: [DeploymentService],
})
export class DeploymentModule {}
