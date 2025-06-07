import { Query, Resolver } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './entities/node.entity';

@Resolver()
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}

  @Query(() => [Node], { name: 'getNodes' })
  async getNodes() {
    return this.nodeService.getNodes();
  }
}
