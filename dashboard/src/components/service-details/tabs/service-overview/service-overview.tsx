import { ServiceWithDeployment } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';
import { ServiceInfo } from './service-info';

export const ServiceOverview = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const { activeDeployment, draftDeployment } = service;
  return (
    <div className="flex justify-between">
      <div>content</div>
      <div className="border-l h-full w-[300px]">
        <ServiceInfo service={service} />
      </div>
    </div>
  );
};
