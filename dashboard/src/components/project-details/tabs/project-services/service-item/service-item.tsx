import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GetProjectServicesQuery } from '../_generated/getProjectServicesQuery.generated';
import { ServiceStatusBadge } from '@/components/service/service-status-badge/service-status-badge';

const providerToColor: Record<string, string> = {
  docker: 'bg-blue-50 text-blue-500 border-blue-300',
};

export const ServiceItem = ({
  service,
}: {
  service: GetProjectServicesQuery['services'][number];
}) => {
  const router = useRouter();
  const { activeDeployment, draftDeployment } = service;

  return (
    <div
      className="flex items-center border-b h-14 text-sm px-4 overflow-hidden gap-4 hover:bg-slate-50"
      onClick={() => {
        router.push(`/dashboard/service/${service._id}`);
      }}
    >
      <div className="flex w-1/2 border-r h-14 items-center pr-4">
        <div className="flex items-center gap-2 font-medium">
          <div>{service.name}</div>
        </div>
      </div>
      <div className="flex w-1/2 items-center">
        <div className="w-40 flex">
          <ServiceStatusBadge
            status={
              activeDeployment?.containerStatus ||
              draftDeployment?.containerStatus
            }
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div
            className={`border rounded-lg px-2 py-0.5 capitalize font-medium ${
              providerToColor[service.type]
            }`}
          >
            {service.type}
          </div>
          {/* <div>{service.image}</div> */}
        </div>
        <div className="text-right ml-auto">
          {/* {service.containerId || `Hasn't deployed yet`} */}
        </div>
      </div>
    </div>
  );
};
