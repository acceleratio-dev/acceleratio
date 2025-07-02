import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeEntity } from './entities/node.entity';
import { KubernetesNodesService } from 'src/kubernetes/kubernetes-nodes.service';
import { KubernetesNetworksService } from 'src/kubernetes/kubernetes-networks.service';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(NodeEntity)
    private readonly nodeRepository: Repository<NodeEntity>,
    private readonly kubernetesNodesService: KubernetesNodesService,
    private readonly kubernetesNetworksService: KubernetesNetworksService,
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
          isMaster: node.isMaster,
        });
      } else {
        await this.nodeRepository.save({
          isMaster: node.isMaster,
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

  async removeNode(nodeId: string) {
    const node = await this.nodeRepository.findOne({ where: { id: nodeId } });
    if (!node) {
      throw new Error('Server not found');
    }

    if (node.isMaster) {
      throw new Error('Cannot delete master node');
    }

    await this.kubernetesNodesService.removeNode(node.name);
    await this.nodeRepository.delete(nodeId);

    return true;
  }

  async getAddNodeCommand() {
    const token = await this.kubernetesNodesService.getNodeToken();
    const ip = await this.kubernetesNetworksService.getLoadBalancerIP();
    return `curl -sfL https://get.k3s.io | K3S_URL=https://${ip}:6443 K3S_TOKEN=${token} sh -`;
  }
}
