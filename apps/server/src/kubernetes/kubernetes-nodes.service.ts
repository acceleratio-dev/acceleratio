import { Injectable } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { CoreV1Api, Exec } from '@kubernetes/client-node';
import * as fs from 'fs';

@Injectable()
export class KubernetesNodesService {
  private readonly kubernetesApi: CoreV1Api;
  private readonly execApi: Exec;

  constructor(private readonly kubernetesService: KubernetesService) {
    const { kubernetesApi, execApi } = this.kubernetesService.getApis();
    this.kubernetesApi = kubernetesApi;
    this.execApi = execApi;
  }

  async getNodes() {
    const nodes = await this.kubernetesApi.listNode();

    return nodes.items.map((node) => {
      const isMaster =
        node.metadata.labels['node-role.kubernetes.io/master'] === 'true' ||
        node.metadata.labels['node-role.kubernetes.io/control-plane'] === 'true';

      return {
        name: node.metadata.name,
        customName: node.metadata.labels['acceleratio/node-name'] || node.metadata.name,
        isMaster,
        ip: node.status.addresses.find((address) => address.type === 'InternalIP')?.address,
        cpu: node.status.allocatable.cpu,
        ram: ((parseInt(node.status.allocatable.memory) * 1024) / 1_000_000_000)?.toFixed(2),
        storage: (Number(node.status.allocatable[`ephemeral-storage`]) / 1_000_000_000)?.toFixed(2),
        status: node.status.conditions.find((condition) => condition.type === 'Ready')?.status,
      };
    });
  }

  async renameNode(kubernetesName: string, newName: string) {
    const node = await this.kubernetesApi.readNode({ name: kubernetesName });
    if (!node) {
      throw new Error('Node not found');
    }

    await this.kubernetesApi.patchNode({
      name: kubernetesName,
      body: {
        metadata: {
          labels: {
            'acceleratio/node-name': newName,
          },
        },
      },
    });
  }

  async removeNode(kubernetesName: string) {
    await this.kubernetesApi.deleteNode({ name: kubernetesName });
  }

  async getNodeToken() {
    try {
      const token = fs.readFileSync('/token/node-token', 'utf8').trim();
      return token;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        return 'MOCK-K3S-TOKEN';
      }
      console.error('Error reading node token:', error);
      throw error;
    }
  }
}
