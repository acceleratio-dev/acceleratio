import { V1Deployment } from '@kubernetes/client-node';
import { DeploymentConfig } from 'src/deployment/entities/deployment.entity';

export const formatDeployment = (
  config: DeploymentConfig,
  namespace: string,
): V1Deployment => {
  return {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      namespace: namespace,
      generateName: 'app-',
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: 'app',
        },
      },
      template: {
        metadata: {
          labels: {
            app: 'app',
          },
        },
        spec: {
          containers: [
            {
              name: 'app',
              image: config.image,
              ports: [
                {
                  containerPort: 80,
                },
              ],
            },
          ],
        },
      },
    },
  };
};
