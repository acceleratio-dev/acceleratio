import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentVariable, EnvironmentVariableScope } from './entities/environment-variables';
import { CreateEnvironmentVariableInput } from './dto/create-environment-variable.input';

@Injectable()
export class EnvironmentVariablesService {
  constructor(
    @InjectRepository(EnvironmentVariable)
    private readonly environmentVariableRepository: Repository<EnvironmentVariable>,
  ) {}

  async getProjectEnvironmentVariables(projectId: string) {
    return this.environmentVariableRepository.find({
      where: {
        projectId,
      },
    });
  }

  async getServiceEnvironmentVariables(serviceId: string) {
    return this.environmentVariableRepository.find({
      where: {
        serviceId,
      },
    });
  }

  async deleteEnvironmentVariable(id: string) {
    await this.environmentVariableRepository.delete(id);
    return true;
  }

  async createEnvironmentVariable(createEnvironmentVariableInput: CreateEnvironmentVariableInput) {
    if (
      createEnvironmentVariableInput.scope === EnvironmentVariableScope.SERVICE &&
      !createEnvironmentVariableInput.serviceId
    ) {
      throw new Error('Service ID is required');
    }

    if (
      createEnvironmentVariableInput.scope === EnvironmentVariableScope.PROJECT &&
      !createEnvironmentVariableInput.projectId
    ) {
      throw new Error('Project ID is required');
    }

    return this.environmentVariableRepository.save(createEnvironmentVariableInput);
  }
}
