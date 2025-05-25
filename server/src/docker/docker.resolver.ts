import { Mutation, Resolver } from '@nestjs/graphql';
import { DockerService } from './docker.service';
import { Query } from '@nestjs/graphql';
import { Server } from './models/server.model';

@Resolver()
export class DockerResolver {
  constructor(private readonly dockerService: DockerService) {}

  @Mutation(() => Boolean)
  async initSwarm() {
    const nodeId = await this.dockerService.initSwarm();

    if (!nodeId) {
      return false;
    }

    return true;
  }

  @Query(() => [Server])
  async getNodes() {
    return this.dockerService.getNodes();
  }

  @Query(() => Boolean)
  async isSwarmInitialized() {
    return this.dockerService.isSwarmInitialized();
  }
}
