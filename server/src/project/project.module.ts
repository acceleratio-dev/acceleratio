import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from './models/project.model';

@Module({
  imports: [TypegooseModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
