import { Injectable } from '@nestjs/common';
import {
  AppsV1Api,
  CoreV1Api,
  KubeConfig,
  Cluster,
} from '@kubernetes/client-node';
import { DeploymentConfig } from 'src/deployment/entities/deployment.entity';
import { formatDeployment } from './utils/formatDeployment';

@Injectable()
export class KubernetesService {
  private readonly kubernetesApi: CoreV1Api;
  private readonly appsV1Api: AppsV1Api;

  constructor() {
    const kc = new KubeConfig();
    kc.loadFromDefault();
    const currentCluster = kc.getCurrentCluster();
    if (currentCluster) {
      const clusterIndex = kc.clusters.findIndex(
        (c) => c.name === currentCluster.name,
      );
      if (clusterIndex !== -1) {
        kc.clusters[clusterIndex] = {
          ...currentCluster,
          skipTLSVerify: true,
        };
      }
    }
    this.kubernetesApi = kc.makeApiClient(CoreV1Api);
    this.appsV1Api = kc.makeApiClient(AppsV1Api);
  }

  async getAllPods() {
    const pods = await this.kubernetesApi.listPodForAllNamespaces();
    return pods.items;
  }

  async getNodes() {
    const nodes = await this.kubernetesApi.listNode();
    return nodes.items;
  }

  async createDeployment(config: DeploymentConfig, namespace: string) {
    const deployment = formatDeployment(config, namespace);
    const createdDeployment = await this.appsV1Api.createNamespacedDeployment({
      namespace,
      body: deployment,
    });

    return createdDeployment;
  }

  async deleteDeployment(deploymentId: string, namespace: string) {
    await this.appsV1Api.deleteNamespacedDeployment({
      name: deploymentId,
      namespace,
    });
  }
}
