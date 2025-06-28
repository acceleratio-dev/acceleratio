import { Injectable } from '@nestjs/common';
import { KubeConfig, CoreV1Api, CustomObjectsApi } from '@kubernetes/client-node';
import { parseTraefikRule } from './utils/parseRule';

@Injectable()
export class KubernetesNetworksService {
  private readonly kubernetesApi: CoreV1Api;
  private readonly customObjectsApi: CustomObjectsApi;

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
    this.customObjectsApi = kc.makeApiClient(CustomObjectsApi);
  }

  private async ensureNamespace(namespace: string) {
    try {
      await this.kubernetesApi.readNamespace({ name: namespace });
    } catch (error) {
      await this.kubernetesApi.createNamespace({
        body: {
          metadata: {
            name: namespace,
          },
        },
      });
    }
  }

  private async getIngressRoute(domain: string) {
    const ingressRoutes = await this.customObjectsApi.listNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'ingressroutes',
      labelSelector: `domain=${domain.replace(/\./g, '-')}`,
    });

    return ingressRoutes.items[0];
  }

  private async updateStripPrefix(domain: string, routeName: string, prefix: string, operation: 'add' | 'remove') {
    const existingMiddleware = await this.customObjectsApi.listNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'middlewares',
      labelSelector: `name=${routeName}, type=stripPrefix`,
    });

    if (existingMiddleware.items.length === 0) {
      await this.customObjectsApi.createNamespacedCustomObject({
        group: 'traefik.io',
        version: 'v1alpha1',
        namespace: 'ingress-namespace',
        plural: 'middlewares',
        body: {
          apiVersion: 'traefik.io/v1alpha1',
          kind: 'Middleware',
          metadata: {
            name: `${domain.replace(/\./g, '-')}-stripPrefix`,
            labels: {
              type: 'strip-prefix',
            },
          },
          spec: {
            stripPrefix: {
              prefixes: [prefix],
            },
          },
        },
      });
    } else {
      await this.customObjectsApi.replaceNamespacedCustomObject({
        group: 'traefik.io',
        version: 'v1alpha1',
        namespace: 'ingress-namespace',
        plural: 'middlewares',
        name: `${domain.replace(/\./g, '-')}-stripPrefix`,
        body: {
          ...existingMiddleware.items[0],
          spec: {
            ...existingMiddleware.items[0].spec,
            stripPrefix: {
              ...existingMiddleware.items[0].spec.stripPrefix,
              prefixes:
                operation === 'add'
                  ? [...existingMiddleware.items[0].spec.stripPrefix.prefixes, prefix]
                  : existingMiddleware.items[0].spec.stripPrefix.prefixes.filter((p) => p !== prefix),
            },
          },
        },
      });
    }
  }

  private async createIngressRoute({
    domain,
    prefix,
    formattedPrefix,
    serviceUuid,
    serviceNamespace,
  }: {
    domain: string;
    prefix: string;
    formattedPrefix: string;
    serviceUuid: string;
    serviceNamespace: string;
  }) {
    await this.customObjectsApi.createNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'ingressroutes',
      body: {
        apiVersion: 'traefik.io/v1alpha1',
        kind: 'IngressRoute',
        metadata: {
          name: `domain-${domain.replace(/\./g, '-')}`,
          namespace: 'ingress-namespace',
          labels: {
            type: 'domain-service',
            'app.kubernetes.io/managed-by': 'acceleratio',
            domain: domain.replace(/\./g, '-'),
          },
          annotations: {
            'kubernetes.io/ingress.class': 'traefik',
            'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
            'traefik.ingress.kubernetes.io/redirect-entry-point': 'https',
          },
        },
        spec: {
          entryPoints: ['web', 'websecure'],
          routes: [
            {
              match: `Host("${domain}") ${prefix ? `&& PathPrefix("${prefix}")` : ''}`,
              kind: 'Rule',
              services: [
                {
                  name: `service-${serviceUuid}-${formattedPrefix}`,
                  namespace: serviceNamespace,
                  port: 80,
                },
              ],
            },
          ],
          tls: {
            secretName: `${domain.replace(/\./g, '-')}-tls`,
          },
        },
      },
    });
  }

  async assignPathToService({
    domain,
    prefix,
    serviceId,
    serviceNamespace,
    port,
    stripPrefix,
  }: {
    domain: string;
    prefix: string;
    serviceId: string;
    serviceNamespace: string;
    port: number;
    stripPrefix: boolean;
  }) {
    await this.ensureNamespace('ingress-namespace');

    const formattedPrefix = prefix ? prefix.replace(/\//g, '') : 'root';

    await this.kubernetesApi.createNamespacedService({
      namespace: serviceNamespace,
      body: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: `service-${serviceId}-${formattedPrefix}`,
          namespace: serviceNamespace,
          labels: {
            domain: domain,
            service: serviceId,
            type: 'domain-service',
          },
        },
        spec: {
          selector: {
            service: serviceId,
          },
          ports: [{ port: port, targetPort: port }],
          type: 'ClusterIP',
        },
      },
    });

    const existingIngressRoute = await this.getIngressRoute(domain);
    if (!existingIngressRoute) {
      await this.createIngressRoute({
        domain,
        prefix: formattedPrefix,
        formattedPrefix: formattedPrefix,
        serviceUuid: serviceId,
        serviceNamespace: serviceNamespace,
      });
      if (stripPrefix) {
        await this.updateStripPrefix(domain, `domain-${domain.replace(/\./g, '-')}`, prefix, 'add');
      }
      return true;
    }

    const existingRouteIndex = existingIngressRoute.spec.routes.findIndex((route) => {
      const { domain: routeDomain, prefix: routePrefix } = parseTraefikRule(route.match);
      const hasMatchingService = route.services?.some(
        (service) => service.name === `service-${serviceId}-${formattedPrefix}`,
      );
      return routeDomain === domain && routePrefix === prefix && hasMatchingService;
    });

    if (stripPrefix) {
      await this.updateStripPrefix(domain, `domain-${domain.replace(/\./g, '-')}`, prefix, 'add');
    }

    if (existingRouteIndex !== -1) {
      existingIngressRoute.spec.routes[existingRouteIndex] = {
        match: `Host("${domain}") ${prefix ? `&& PathPrefix("${prefix}")` : ''}`,
        kind: 'Rule',
        services: [
          {
            name: `service-${serviceId}-${formattedPrefix}`,
            namespace: serviceNamespace,
            port: port,
            middlewares: stripPrefix ? [`${domain.replace(/\./g, '-')}-stripPrefix`] : [],
          },
        ],
      };
    } else {
      existingIngressRoute.spec.routes.push({
        match: `Host("${domain}") ${prefix ? `&& PathPrefix("${prefix}")` : ''}`,
        kind: 'Rule',
        services: [
          {
            name: `service-${serviceId}-${formattedPrefix}`,
            namespace: serviceNamespace,
            port: port,
            middlewares: stripPrefix ? [`${domain.replace(/\./g, '-')}-stripPrefix`] : [],
          },
        ],
      });
    }

    await this.customObjectsApi.replaceNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'ingressroutes',
      name: existingIngressRoute.metadata.name,
      body: existingIngressRoute,
    });

    return true;
  }

  async getServiceDomains(serviceId: string) {
    this.ensureNamespace('ingress-namespace');

    const ingressList = await this.customObjectsApi.listNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'ingressroutes',
    });

    if (ingressList.items.length === 0) {
      return [];
    }
    let response = [];

    ingressList.items.forEach((ingressRoute) => {
      const domains = ingressRoute.spec;

      domains.routes.forEach((route) => {
        route.services.forEach((service) => {
          if (service.name.startsWith(`service-${serviceId}`)) {
            const { domain, prefix } = parseTraefikRule(route.match);
            response.push({
              domain,
              path: prefix || '/',
              port: service.port,
            });
          }
        });
      });
    });

    return response;
  }

  async removeServiceDomain(serviceId: string, url: string, path: string) {
    await this.ensureNamespace('ingress-namespace');

    const formattedPrefix = path && path !== '/' ? path.replace(/\//g, '') : 'root';

    const ingressList = await this.customObjectsApi.listNamespacedCustomObject({
      group: 'traefik.io',
      version: 'v1alpha1',
      namespace: 'ingress-namespace',
      plural: 'ingressroutes',
    });

    for (const ingressRoute of ingressList.items) {
      const { domain } = parseTraefikRule(ingressRoute.spec.routes[0]?.match || '');

      if (domain === url) {
        const updatedRoutes = ingressRoute.spec.routes.filter((route) => {
          const routeServices = route.services || [];
          const hasMatchingService = routeServices.some(
            (service) => service.name === `service-${serviceId}-${formattedPrefix}`,
          );

          if (hasMatchingService) {
            const { domain: routeDomain, prefix: routePrefix } = parseTraefikRule(route.match);
            return !(routeDomain === url && (routePrefix || '/') === path);
          }
          return true;
        });

        if (updatedRoutes.length === 0) {
          // If no routes left, delete the entire ingress route
          await this.customObjectsApi.deleteNamespacedCustomObject({
            group: 'traefik.io',
            version: 'v1alpha1',
            namespace: 'ingress-namespace',
            plural: 'ingressroutes',
            name: ingressRoute.metadata.name,
          });
        } else {
          // Update the ingress route with remaining routes
          ingressRoute.spec.routes = updatedRoutes;
          await this.customObjectsApi.replaceNamespacedCustomObject({
            group: 'traefik.io',
            version: 'v1alpha1',
            namespace: 'ingress-namespace',
            plural: 'ingressroutes',
            name: ingressRoute.metadata.name,
            body: ingressRoute,
          });
        }

        // Also remove the service if it's no longer used by any ingress route
        const allIngressRoutes = await this.customObjectsApi.listNamespacedCustomObject({
          group: 'traefik.io',
          version: 'v1alpha1',
          namespace: 'ingress-namespace',
          plural: 'ingressroutes',
        });

        const serviceStillUsed = allIngressRoutes.items.some((ir) =>
          ir.spec.routes.some((route) =>
            route.services?.some((service) => service.name === `service-${serviceId}-${formattedPrefix}`),
          ),
        );

        if (!serviceStillUsed) {
          try {
            await this.kubernetesApi.deleteNamespacedService({
              name: `service-${serviceId}-${formattedPrefix}`,
              namespace: ingressRoute.spec.routes[0]?.services[0]?.namespace || 'default',
            });
          } catch (error) {
            // Service might already be deleted or not exist
            console.log(`Service service-${serviceId} not found or already deleted`);
            throw Error(`Domain ${url}${formattedPrefix} not found or already deleted`);
          }
        }

        return true;
      }
    }

    return false;
  }
}
