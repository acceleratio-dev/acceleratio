import moment from 'moment';
import { ServiceWithDeployment } from '../../service-deployments/_generated/getServiceDeploymentsQuery.generated';

export const ServiceInfo = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const { activeDeployment, draftDeployment } = service;

  const blocks = [
    {
      label: 'About',
      info: {
        status:
          activeDeployment?.containerStatus?.toLowerCase() || 'Not deployed',
        'last edit': moment(service.updatedAt).fromNow(),
        created: moment(service.createdAt).fromNow(),
      },
    },
    {
      label: 'Provider',
      info: {
        type: service.type.toLowerCase(),
        image:
          activeDeployment?.config?.image || draftDeployment?.config?.image,
      },
    },
    {
      label: 'Resources limits',
      info: {
        cpu: (activeDeployment?.config?.cpuLimit || 'Unlimited') + ' vCPUs',
        ram: (activeDeployment?.config?.memoryLimit || 'Unlimited') + ' MB',
      },
    },
  ];

  return (
    <>
      {blocks.map((block) => (
        <div className="p-6 border-b" key={block.label}>
          <div className="text-sm font-medium">{block.label}</div>
          <div className="space-y-2 mt-4">
            {Object.entries(block.info).map(([key, value]) => (
              <div key={key} className="flex items-center text-sm">
                <div className="w-1/2 text-slate-700 first-letter:uppercase">
                  {key}:
                </div>
                <div className="font-medium first-letter:uppercase">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
