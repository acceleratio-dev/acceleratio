import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { CreateProjectInput } from './dto/createProject.input';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.createProject(createProjectInput);
  }

  @Query(() => [Project])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Query(() => Project)
  getProjectById(@Args('id') id: string) {
    return this.projectService.getProjectById(id);
  }
}
