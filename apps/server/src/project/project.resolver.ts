import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entity/project.entity';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'getProjects' })
  getProjects() {
    return this.projectService.getProjects();
  }

  @Query(() => Project, { name: 'getProjectById' })
  getProjectById(@Args('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.createProject(createProjectInput);
  }
}
