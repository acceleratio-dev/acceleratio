import { DeploymentConfig } from 'src/deployment/models/deploymentConfig.model';

export type CreateDockerServiceInput = {
  serviceId: string;
  deploymentId: string;
  config: DeploymentConfig;
};
