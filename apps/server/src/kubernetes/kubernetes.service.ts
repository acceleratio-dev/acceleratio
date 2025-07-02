import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CoreV1Api, Exec, KubeConfig, Metrics, Watch } from '@kubernetes/client-node';
import { AppsV1Api } from '@kubernetes/client-node';
import { NetworkingV1Api } from '@kubernetes/client-node';
import { formatDeployment } from './utils/formatDeployment';
import { ServiceDeployment } from 'src/services/entities/service-deployment.entity';
import { PubSub } from 'graphql-subscriptions';
import { PodEventType } from './dto/pod.message';
import { EnvironmentVariable } from 'src/environment-variables/entities/environment-variables';

@Injectable()
export class KubernetesService implements OnModuleInit {
  private readonly kubernetesApi: CoreV1Api;
  private readonly appsV1Api: AppsV1Api;
  private readonly watchApi: Watch;
  private readonly metricsClient: Metrics;
  private readonly execApi: Exec;

  constructor(@Inject('PODS_PUBSUB') private readonly podsPubSub: PubSub) {
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
    this.appsV1Api = kc.makeApiClient(AppsV1Api);
    this.metricsClient = new Metrics(kc);
    this.watchApi = new Watch(kc);
    this.execApi = new Exec(kc);
  }

  getApis() {
    return {
      kubernetesApi: this.kubernetesApi,
      appsV1Api: this.appsV1Api,
      watchApi: this.watchApi,
      metricsClient: this.metricsClient,
      execApi: this.execApi,
    };
  }

  async createNamespace() {
    const namespace = await this.kubernetesApi.createNamespace({
      body: {
        metadata: {
          generateName: `project-`,
        },
      },
    });
    return namespace;
  }

  async createDeployment(namespace: string, serviceDeployment: ServiceDeployment) {
    const formattedDeployment = formatDeployment(serviceDeployment, namespace);
    const deployment = await this.appsV1Api.createNamespacedDeployment({
      namespace,
      body: formattedDeployment,
    });
    return deployment;
  }

  async getDeploymentByServiceId(namespace: string, serviceId: string) {
    const deployments = await this.appsV1Api.listNamespacedDeployment({
      namespace,
      labelSelector: `service=${serviceId}`,
    });
    return deployments.items[0];
  }

  private async processEnvironmentVariables(
    environmentVariables: EnvironmentVariable[],
    namespace: string,
    serviceId: string,
  ) {
    const formattedValues = {};

    environmentVariables.forEach((env) => {
      formattedValues[env.name] = env.value;
    });

    const { items } = await this.kubernetesApi.listNamespacedConfigMap({
      namespace,
      labelSelector: `service=${serviceId}`,
    });

    if (items.length > 0) {
      await this.kubernetesApi.replaceNamespacedConfigMap({
        namespace,
        name: items[0].metadata.name,
        body: {
          data: formattedValues,
          metadata: {
            name: items[0].metadata.name,
            labels: {
              service: serviceId,
            },
          },
        },
      });
    } else {
      await this.kubernetesApi.createNamespacedConfigMap({
        namespace,
        body: {
          metadata: {
            name: `service-${serviceId}-config`,
            labels: {
              service: serviceId,
            },
          },
          data: formattedValues,
        },
      });
    }

    return `service-${serviceId}-config`;
  }

  async updateDeployment(
    namespace: string,
    serviceDeployment: ServiceDeployment,
    serviceId: string,
    environmentVariables: EnvironmentVariable[],
  ) {
    const configMapName = await this.processEnvironmentVariables(environmentVariables, namespace, serviceId);

    const deployment = await this.appsV1Api.listNamespacedDeployment({
      namespace,
      labelSelector: `service=${serviceId}`,
    });
    if (deployment.items.length > 0) {
      await this.appsV1Api.deleteNamespacedDeployment({
        namespace,
        name: deployment.items[0].metadata.name,
      });
    }

    const formattedDeployment = formatDeployment(serviceDeployment, namespace, configMapName);

    await this.appsV1Api.createNamespacedDeployment({
      namespace,
      body: formattedDeployment,
    });

    return deployment;
  }

  async stopDeployment(namespace: string, deploymentName: string) {
    const deployment = await this.appsV1Api.readNamespacedDeployment({
      namespace,
      name: deploymentName,
    });

    await this.appsV1Api.replaceNamespacedDeployment({
      namespace,
      name: deploymentName,
      body: {
        ...deployment,
        spec: {
          ...deployment.spec,
          replicas: 0,
        },
      },
    });
    return deployment;
  }

  async getServicePods(serviceId: string) {
    const pods = await this.kubernetesApi.listPodForAllNamespaces({
      labelSelector: `service=${serviceId}`,
    });

    return pods.items.map((pod) => ({
      name: pod.metadata.name,
      node: pod?.spec?.nodeName || 'N/A',
      image: pod?.spec?.containers?.[0]?.image || 'N/A',
      status: pod?.status?.phase || 'N/A',
      startTime: pod?.status?.startTime || 'N/A',
    }));
  }

  async getPodLogs(namespace: string, podName: string) {
    const logs = await this.kubernetesApi.readNamespacedPodLog({
      name: podName,
      namespace,
      tailLines: 100,
    });
    return logs.split('\n');
  }
  async restartPod(namespace: string, podName: string) {
    await this.kubernetesApi.deleteNamespacedPod({
      name: podName,
      namespace,
    });
    return true;
  }

  async onModuleInit() {
    this.startPodWatch();
  }

  private startPodWatch() {
    this.watchApi.watch(
      '/api/v1/pods',
      {},
      (type, pod) => {
        const responsePod = {
          name: pod.metadata.name,
          node: pod?.spec?.nodeName || 'N/A',
          image: pod?.spec?.containers?.[0]?.image || 'N/A',
          status: pod?.status?.phase || 'N/A',
          startTime: pod?.status?.startTime ? new Date(pod.status.startTime).getTime() : 'N/A',
        };
        if (type === 'DELETED' || pod?.status?.phase === 'Terminated') {
          this.podsPubSub.publish(`pods:${pod.metadata.labels.service}`, {
            type: PodEventType.DELETED,
            pod: responsePod,
          });
        } else if (type === 'ADDED') {
          this.podsPubSub.publish(`pods:${pod.metadata.labels.service}`, {
            type: PodEventType.CREATED,
            pod: responsePod,
          });
        } else if (type === 'MODIFIED') {
          this.podsPubSub.publish(`pods:${pod.metadata.labels.service}`, {
            type: PodEventType.UPDATED,
            pod: responsePod,
          });
        }
      },
      (err) => {
        console.error('Pod watch failed:', err);
        console.log('Retrying pod watch in 5 seconds...');
        setTimeout(() => {
          this.startPodWatch();
        }, 5000);
      },
    );
  }
}
