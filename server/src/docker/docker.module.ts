import { forwardRef, Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerResolver } from './docker.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Server } from './models/server.model';
import { DockerEventService } from './dockerEvent.service';
import { DeploymentModule } from 'src/deployment/deployment.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Server]),
    forwardRef(() => DeploymentModule),
  ],
  providers: [DockerResolver, DockerService, DockerEventService],
  exports: [DockerService],
})
export class DockerModule {}
