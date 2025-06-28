import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project])
  async getProjects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Query(() => Project)
  async getProjectById(@Args('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectsService.createProject(createProjectInput);
  }
}
