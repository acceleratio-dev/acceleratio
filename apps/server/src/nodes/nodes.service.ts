import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeEntity } from './entities/node.entity';
import { KubernetesNodesService } from 'src/kubernetes/kubernetes-nodes.service';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(NodeEntity)
    private readonly nodeRepository: Repository<NodeEntity>,
    private readonly kubernetesNodesService: KubernetesNodesService,
  ) {}

  async getNodes() {
    const storedNodes = await this.nodeRepository.find();
    const kubernetesNodes = await this.kubernetesNodesService.getNodes();

    kubernetesNodes.forEach(async (node) => {
      const storedNode = storedNodes.find((storedNode) => storedNode.name === node.name);
      if (storedNode && JSON.stringify(storedNode) !== JSON.stringify(node)) {
        this.nodeRepository.update(storedNode.id, {
          status: node.status,
          cpu: node.cpu,
          ram: node.ram,
          storage: node.storage,
        });
      } else {
        await this.nodeRepository.save({
          name: node.name,
          ip: node.ip,
          status: node.status,
          cpu: node.cpu,
          ram: node.ram,
          storage: node.storage,
        });
      }
    });

    return this.nodeRepository.find();
  }
}
