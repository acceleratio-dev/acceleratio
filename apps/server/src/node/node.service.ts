import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';

@Injectable()
export class NodeService {
  private readonly logger = new Logger(NodeService.name);
  constructor(
    private readonly kubernetesService: KubernetesService,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
  ) {}

  private getNodeRole(node) {
    const labels = node.metadata.labels || {};
    const taints = node.spec.taints || [];

    if (
      labels['node-role.kubernetes.io/control-plane'] !== undefined ||
      labels['node-role.kubernetes.io/master'] !== undefined
    ) {
      return 'control-plane';
    }

    const hasControlPlaneTaint = taints.some(
      (taint) =>
        taint.key === 'node-role.kubernetes.io/control-plane' ||
        taint.key === 'node-role.kubernetes.io/master',
    );

    if (hasControlPlaneTaint) {
      return 'control-plane';
    }

    return 'worker';
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const nodes = await this.kubernetesService.getNodes();
    const currentDate = new Date();
    const nodesData = nodes
      .filter((n) => !!n.status.nodeInfo.systemUUID)
      .map((node) => ({
        name: node.metadata?.name || '',
        role: this.getNodeRole(node),
        status:
          node.status.conditions.find((condition) => condition.type === 'Ready')
            ?.status || 'Unknown',
        externalIp:
          node.status.addresses?.find((addr) => addr.type === 'ExternalIP')
            ?.address || 'N/A',
        systemUuid: node.status.nodeInfo.systemUUID,
        createdAt: new Date(node.metadata?.creationTimestamp || undefined),
        updatedAt: currentDate,
      }));

    await this.nodeRepository.upsert(nodesData, {
      conflictPaths: ['systemUuid'],
    });

    this.logger.debug('Nodes updated');
  }

  async getNodes() {
    return this.nodeRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }
}
