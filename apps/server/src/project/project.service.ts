import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/project.entity';
import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjects() {
    return this.projectRepository.find();
  }

  async createProject(createProjectInput: CreateProjectInput) {
    const project = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(project);
  }

  async getProjectById(id: string) {
    return this.projectRepository.findOne({ where: { id } });
  }
}
