import { forwardRef, Module } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { DeploymentResolver } from './deployment.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Deployment } from './models/deployment.model';
import { DockerModule } from 'src/docker/docker.module';
import { DeploymentDomainService } from './deployment-domain.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Deployment]),
    forwardRef(() => DockerModule),
  ],
  providers: [DeploymentResolver, DeploymentService, DeploymentDomainService],
  exports: [DeploymentService, DeploymentDomainService],
})
export class DeploymentModule {}
