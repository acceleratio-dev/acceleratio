import { forwardRef, Module } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { DeploymentResolver } from './deployment.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Deployment } from './models/deployment.model';
import { DockerModule } from 'src/docker/docker.module';
import { Domain } from './models/domain.model';
import { DeploymentDomainService } from './deployment-domain.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Deployment, Domain]),
    forwardRef(() => DockerModule),
  ],
  providers: [DeploymentResolver, DeploymentService, DeploymentDomainService],
  exports: [DeploymentService],
})
export class DeploymentModule {}
