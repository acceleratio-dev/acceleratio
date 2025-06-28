import { V1Deployment } from '@kubernetes/client-node';
import { ServiceDeployment } from 'src/services/entities/service-deployment.entity';

export const formatDeployment = (
  deployment: ServiceDeployment,
  namespace: string,
  configMapName?: string,
): V1Deployment => {
  return {
    metadata: {
      name: deployment.internalName,
      namespace,
      labels: {
        'app.kubernetes.io/managed-by': 'acceleratio',
        app: deployment.internalName,
        service: deployment.serviceId,
        deployment: deployment.id,
      },
    },
    spec: {
      replicas: deployment.replicas,
      selector: {
        matchLabels: {
          app: deployment.internalName,
        },
      },
      template: {
        metadata: {
          labels: {
            app: deployment.internalName,
            service: deployment.serviceId,
            deployment: deployment.id,
          },
        },
        spec: {
          containers: [
            {
              name: deployment.internalName,
              image: deployment.image,
              envFrom: configMapName
                ? [
                    {
                      configMapRef: {
                        name: configMapName,
                      },
                    },
                  ]
                : [],
            },
          ],
        },
      },
    },
  };
};
