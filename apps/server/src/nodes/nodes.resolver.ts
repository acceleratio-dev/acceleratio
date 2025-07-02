import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NodesService } from './nodes.service';
import { NodeEntity } from './entities/node.entity';

@Resolver()
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

  @Query(() => [NodeEntity])
  async getNodes() {
    return this.nodesService.getNodes();
  }

  @Query(() => String)
  async getAddNodeCommand() {
    return this.nodesService.getAddNodeCommand();
  }

  @Mutation(() => Boolean)
  async removeNode(@Args('nodeId') nodeId: string) {
    return this.nodesService.removeNode(nodeId);
  }
}
