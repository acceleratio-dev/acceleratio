import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Project } from './models/project.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectModel: ReturnModelType<typeof Project>,
  ) {}

  async getProjectById(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }

  async getProjects() {
    const projects = await this.projectModel.find();
    return projects;
  }

  async createProject(createProjectInput: CreateProjectInput) {
    const project = await this.projectModel.create(createProjectInput);
    return project;
  }

  async deleteProject(id: string) {
    await this.projectModel.findByIdAndDelete(id);
    return true;
  }

  async updateProject(id: string, updateProjectInput: UpdateProjectInput) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectInput,
      {
        new: true,
      },
    );
    return project;
  }
}
