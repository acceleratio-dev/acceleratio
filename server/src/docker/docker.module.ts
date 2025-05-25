import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerResolver } from './docker.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Server } from './models/server.model';

@Module({
  imports: [TypegooseModule.forFeature([Server])],
  providers: [DockerResolver, DockerService],
})
export class DockerModule {}
