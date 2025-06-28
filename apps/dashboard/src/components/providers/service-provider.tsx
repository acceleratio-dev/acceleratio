import {
  GetServiceByIdQuery,
  GetServiceDeploymentsQuery,
  ServiceDeploymentEventType,
  ServiceDeploymentStatus,
  useGetServiceDeploymentsQuery,
  useServiceDeploymentsSubscription,
} from '@/lib/graphql/generated';
import { createContext, useState, useEffect } from 'react';
import { ServiceDetailsSkeleton } from '../services/service-details/service-details-skeleton';

export const ServiceContext = createContext<ProviderContext>({} as ProviderContext);

interface ProviderContext {
  service: GetServiceByIdQuery['service'];
  deployments: GetServiceDeploymentsQuery['deployments'];
}

export const ServiceProvider = ({
  children,
  service,
}: {
  children: React.ReactNode;
  service: GetServiceByIdQuery['service'];
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deployments, setDeployments] = useState<GetServiceDeploymentsQuery['deployments']>([]);

  const { data: deploymentsData } = useGetServiceDeploymentsQuery({
    variables: {
      serviceId: service.id,
    },
  });

  useEffect(() => {
    if (deploymentsData?.deployments) {
      setDeployments(deploymentsData.deployments);
      setIsLoading(false);
    }
  }, [deploymentsData]);

  useServiceDeploymentsSubscription({
    variables: {
      serviceId: service.id,
    },
    onData: ({ data }) => {
      const payload = data.data?.payload;

      switch (payload?.event_type) {
        case ServiceDeploymentEventType.DeploymentCreated:
          setDeployments((prev) => [payload.deployment, ...prev]);
          break;
        case ServiceDeploymentEventType.DeploymentUpdated:
          setDeployments((prev) =>
            prev.map((deployment) => (deployment.id === payload.deployment.id ? payload.deployment : deployment)),
          );
          break;
        case ServiceDeploymentEventType.DeploymentDeployed:
          setDeployments((prev) =>
            prev.map((deployment) => {
              if (deployment.id === payload.deployment.id) {
                return payload.deployment;
              }

              return {
                ...deployment,
                status: ServiceDeploymentStatus.Finished,
              };
            }),
          );
          break;
      }
    },
  });

  if (isLoading) return <ServiceDetailsSkeleton />;

  return <ServiceContext.Provider value={{ service, deployments }}>{children}</ServiceContext.Provider>;
};
