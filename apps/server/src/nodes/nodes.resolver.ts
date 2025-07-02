import { Query, Resolver } from '@nestjs/graphql';
import { NodesService } from './nodes.service';
import { NodeEntity } from './entities/node.entity';

@Resolver()
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

  @Query(() => [NodeEntity])
  async getNodes() {
    return this.nodesService.getNodes();
  }
}
