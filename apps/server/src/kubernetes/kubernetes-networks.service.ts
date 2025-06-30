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
      if (operation === 'add') {
        const existingMiddleware = await this.customObjectsApi.listNamespacedCustomObject({
          group: 'traefik.io',
          version: 'v1alpha1',
          namespace: 'ingress-namespace',
          plural: 'middlewares',
          labelSelector: `name=${routeName}, type=stripPrefix`,
        });
        if (existingMiddleware.items.length === 0) {
          return true;
        }

        return await this.customObjectsApi.createNamespacedCustomObject({
          group: 'traefik.io',
          version: 'v1alpha1',
          namespace: 'ingress-namespace',
          plural: 'middlewares',
          body: {
            apiVersion: 'traefik.io/v1alpha1',
            kind: 'Middleware',
            metadata: {
              name: `${domain.replace(/\./g, '-')}-strip-prefix`,
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
      }
    } else {
      const currentPrefixes = existingMiddleware.items[0].spec.stripPrefix.prefixes || [];
      let updatedPrefixes: string[];

      if (operation === 'add') {
        // Only add if not already present
        updatedPrefixes = currentPrefixes.includes(prefix) ? currentPrefixes : [...currentPrefixes, prefix];
      } else {
        // Remove the prefix
        updatedPrefixes = currentPrefixes.filter((p) => p !== prefix);
      }

      // If no prefixes left after removal, delete the middleware
      if (operation === 'remove' && updatedPrefixes.length === 0) {
        await this.customObjectsApi.deleteNamespacedCustomObject({
          group: 'traefik.io',
          version: 'v1alpha1',
          namespace: 'ingress-namespace',
          plural: 'middlewares',
          name: `${domain.replace(/\./g, '-')}-strip-prefix`,
        });
      } else {
        await this.customObjectsApi.replaceNamespacedCustomObject({
          group: 'traefik.io',
          version: 'v1alpha1',
          namespace: 'ingress-namespace',
          plural: 'middlewares',
          name: `${domain.replace(/\./g, '-')}-strip-prefix`,
          body: {
            ...existingMiddleware.items[0],
            spec: {
              ...existingMiddleware.items[0].spec,
              stripPrefix: {
                prefixes: updatedPrefixes,
              },
            },
          },
        });
      }
    }
  }

  private async createIngressRoute({
    domain,
    prefix,
    formattedPrefix,
    serviceUuid,
    serviceNamespace,
    stripPrefix,
  }: {
    domain: string;
    prefix: string;
    formattedPrefix: string;
    serviceUuid: string;
    serviceNamespace: string;
    stripPrefix: boolean;
  }) {
    const secretName = `${domain.replace(/\./g, '-')}-tls`;
    try {
      await this.kubernetesApi.readNamespacedSecret({
        name: secretName,
        namespace: 'ingress-namespace',
      });
    } catch (error) {
      await this.customObjectsApi.createNamespacedCustomObject({
        group: 'cert-manager.io',
        version: 'v1',
        namespace: 'ingress-namespace',
        plural: 'certificates',
        body: {
          apiVersion: 'cert-manager.io/v1',
          kind: 'Certificate',
          metadata: {
            name: secretName,
            namespace: 'ingress-namespace',
          },
          spec: {
            secretName: secretName,
            issuerRef: {
              name: 'letsencrypt-prod',
              kind: 'ClusterIssuer',
            },
            dnsNames: [domain],
            usages: ['digital signature', 'key encipherment'],
            duration: '2160h',
            renewBefore: '360h',
          },
        },
      });
    }

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
              middlewares: stripPrefix ? [{ name: `${domain.replace(/\./g, '-')}-strip-prefix` }] : [],
            },
          ],
          tls: {
            secretName: secretName,
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

    try {
      const existingService = await this.kubernetesApi.readNamespacedService({
        name: `service-${serviceId}-${formattedPrefix}`,
        namespace: serviceNamespace,
      });

      await this.kubernetesApi.replaceNamespacedService({
        namespace: serviceNamespace,
        name: `service-${serviceId}-${formattedPrefix}`,
        body: {
          ...existingService,
          spec: {
            selector: {
              service: serviceId,
            },
            ports: [{ port: port, targetPort: port }],
            type: 'ClusterIP',
          },
        },
      });
    } catch (error) {
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
    }

    const existingIngressRoute = await this.getIngressRoute(domain);
    if (!existingIngressRoute) {
      await this.createIngressRoute({
        domain,
        prefix: prefix,
        formattedPrefix: formattedPrefix,
        serviceUuid: serviceId,
        serviceNamespace: serviceNamespace,
        stripPrefix: stripPrefix,
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
            middlewares: stripPrefix ? [`${domain.replace(/\./g, '-')}-strip-prefix`] : [],
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
            middlewares: stripPrefix ? [`${domain.replace(/\./g, '-')}-strip-prefix`] : [],
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

  async getLoadBalancerIP() {
    const nodes = await this.kubernetesApi.listNode({
      labelSelector: 'node-role.kubernetes.io/master=true',
    });
    const externalIP = nodes?.items[0]?.metadata?.annotations?.['k3s.io/external-ip'];

    if (!externalIP) {
      throw new Error('No public IP found');
    }

    return externalIP;
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

    let serviceNamespace: string | null = null;

    for (const ingressRoute of ingressList.items) {
      const { domain } = parseTraefikRule(ingressRoute.spec.routes[0]?.match || '');

      if (domain === url) {
        const updatedRoutes = ingressRoute.spec.routes.filter((route) => {
          const routeServices = route.services || [];
          const hasMatchingService = routeServices.some(
            (service) => service.name === `service-${serviceId}-${formattedPrefix}`,
          );

          if (route.middlewares) {
            this.updateStripPrefix(domain, ingressRoute.metadata.name, path, 'remove');
          }

          if (hasMatchingService) {
            const matchingService = routeServices.find(
              (service) => service.name === `service-${serviceId}-${formattedPrefix}`,
            );
            if (matchingService) {
              serviceNamespace = matchingService.namespace;
            }

            const { domain: routeDomain, prefix: routePrefix } = parseTraefikRule(route.match);
            return !(routeDomain === url && (routePrefix || '/') === path);
          }
          return true;
        });

        if (updatedRoutes.length === 0) {
          await this.customObjectsApi.deleteNamespacedCustomObject({
            group: 'traefik.io',
            version: 'v1alpha1',
            namespace: 'ingress-namespace',
            plural: 'ingressroutes',
            name: ingressRoute.metadata.name,
          });
        } else {
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

        if (!serviceStillUsed && serviceNamespace) {
          try {
            await this.kubernetesApi.deleteNamespacedService({
              name: `service-${serviceId}-${formattedPrefix}`,
              namespace: serviceNamespace,
            });
          } catch (error) {
            console.log(`Service service-${serviceId}-${formattedPrefix} not found or already deleted`);
            throw Error(`Domain ${url}${path} not found or already deleted`);
          }
        }

        return true;
      }
    }

    return false;
  }
}
