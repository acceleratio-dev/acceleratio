import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly kubernetesService: KubernetesService,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async createProject(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = this.projectRepository.create(createProjectInput);
    const namespace = await this.kubernetesService.createNamespace();
    console.log(namespace.metadata.name);
    project.kubernetesNamespace = namespace.metadata.name;
    return this.projectRepository.save(project);
  }
}
