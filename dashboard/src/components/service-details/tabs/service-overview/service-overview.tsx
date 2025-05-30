import { ServiceWithDeployment } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';
import { ServiceInfo } from './service-info';

export const ServiceOverview = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  return (
    <div className="flex justify-between">
      <div>Content</div>
      <div className="border-l h-full min-w-[300px] max-w-[300px]">
        <ServiceInfo service={service} />
      </div>
    </div>
  );
};
