import { V1Ingress } from '@kubernetes/client-node';

export interface IngressConfig {
  url: string;
  serviceId: string;
  serviceName: string;
  serviceNamespace: string;
  servicePort: number;
  path?: string;
  stripPath?: boolean;
}

export const formatIngress = (url: string): V1Ingress => {
  return {
    apiVersion: 'networking.k8s.io/v1',
    kind: 'Ingress',
    metadata: {
      generateName: `domain-${url.replace(/\./g, '-')}-`,
      namespace: 'ingress-namespace',
      labels: {
        'app.kubernetes.io/managed-by': 'acceleratio',
        domain: url,
      },
      annotations: {
        'kubernetes.io/ingress.class': 'traefik',
        'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
        'traefik.ingress.kubernetes.io/redirect-entry-point': 'https',
      },
    },
    spec: {
      tls: [
        {
          hosts: [url],
          secretName: `${url.replace(/\./g, '-')}-tls`,
        },
      ],
      rules: [
        {
          host: url,
          http: {
            paths: [
              {
                path: '/default-path',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: 'default-backend',
                    port: {
                      number: 9009,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
};

export const formatIngressWithConfig = (config: IngressConfig): V1Ingress => {
  const { url, serviceName, servicePort, path = '/', stripPath = false } = config;

  const annotations: Record<string, string> = {
    'kubernetes.io/ingress.class': 'traefik',
    'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
    'traefik.ingress.kubernetes.io/redirect-entry-point': 'https',
  };

  if (stripPath) {
    annotations['traefik.ingress.kubernetes.io/rewrite-target'] = '/';
  }

  return {
    apiVersion: 'networking.k8s.io/v1',
    kind: 'Ingress',
    metadata: {
      generateName: `domain-${url.replace(/\./g, '-')}-`,
      namespace: 'ingress-namespace',
      labels: {
        'app.kubernetes.io/managed-by': 'acceleratio',
        domain: url,
        'target-service': serviceName,
      },
      annotations,
    },
    spec: {
      tls: [
        {
          hosts: [url],
          secretName: `${url.replace(/\./g, '-')}-tls`,
        },
      ],
      rules: [
        {
          host: url,
          http: {
            paths: [
              {
                path,
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: serviceName,
                    port: {
                      number: servicePort,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
};
