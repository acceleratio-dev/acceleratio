import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EnvironmentVariablesService } from './environment-variables.service';
import { EnvironmentVariable } from './entities/environment-variables';
import { CreateEnvironmentVariableInput } from './dto/create-environment-variable.input';

@Resolver()
export class EnvironmentVariablesResolver {
  constructor(private readonly environmentVariablesService: EnvironmentVariablesService) {}

  @Query(() => [EnvironmentVariable])
  async getProjectEnvironmentVariables(@Args('projectId') projectId: string) {
    return this.environmentVariablesService.getProjectEnvironmentVariables(projectId);
  }

  @Query(() => [EnvironmentVariable])
  async getServiceEnvironmentVariables(@Args('serviceId') serviceId: string) {
    return this.environmentVariablesService.getServiceEnvironmentVariables(serviceId);
  }

  @Mutation(() => EnvironmentVariable)
  async createEnvironmentVariable(
    @Args('createEnvironmentVariableInput') createEnvironmentVariableInput: CreateEnvironmentVariableInput,
  ) {
    return this.environmentVariablesService.createEnvironmentVariable(createEnvironmentVariableInput);
  }

  @Mutation(() => Boolean)
  async deleteEnvironmentVariable(@Args('id') id: string) {
    return this.environmentVariablesService.deleteEnvironmentVariable(id);
  }
}
