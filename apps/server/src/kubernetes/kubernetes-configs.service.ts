import { Injectable } from '@nestjs/common';
import { CoreV1Api, KubeConfig } from '@kubernetes/client-node';

@Injectable()
export class KubernetesConfigsService {
  private readonly kubernetesApi: CoreV1Api;

  constructor() {
    const kc = new KubeConfig();

    if (process.env.KUBERNETES_SERVICE_HOST) {
      kc.loadFromCluster();
    } else {
      kc.loadFromDefault();
      const currentCluster = kc.getCurrentCluster();
      if (currentCluster) {
        const clusterIndex = kc.clusters.findIndex((c) => c.name === currentCluster.name);
        if (clusterIndex !== -1) {
          kc.clusters[clusterIndex] = {
            ...currentCluster,
            skipTLSVerify: true,
          };
        }
      }
    }

    this.kubernetesApi = kc.makeApiClient(CoreV1Api);
  }
}
