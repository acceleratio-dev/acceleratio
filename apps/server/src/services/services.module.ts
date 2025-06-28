import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { Service } from './entities/service.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { ServiceDeployment } from './entities/service-deployment.entity';
import { PubSub } from 'graphql-subscriptions';
import { KubernetesModule } from 'src/kubernetes/kubernetes.module';
import { EnvironmentVariablesModule } from 'src/environment-variables/environment-variables.module';

const deploymentsPubSub = new PubSub();

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServiceDeployment]),
    ProjectsModule,
    KubernetesModule,
    EnvironmentVariablesModule,
  ],
  providers: [
    ServicesResolver,
    ServicesService,
    {
      provide: 'DEPLOYMENTS_PUB_SUB',
      useValue: deploymentsPubSub,
    },
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
