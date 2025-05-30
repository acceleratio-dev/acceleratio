import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';

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

  @Mutation(() => Boolean)
  deleteProject(@Args('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('id') id: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(id, updateProjectInput);
  }
}
