import { ServiceType } from '@/components/service-details/tabs/service-settings/methods/_generated/updateServiceConfigMutation.generated';
import DockerIcon from './icons/docker.svg';

const serviceTypeToIcon = {
  [ServiceType.Docker]: <DockerIcon className="size-3.5" />,
};

export const ServiceTypeBadge = ({
  serviceType,
}: {
  serviceType: ServiceType;
}) => {
  return (
    <div className="inline-flex items-center gap-2 border bg-slate-50 text-xs font-medium rounded-md px-2 py-0.5">
      {serviceTypeToIcon[serviceType]}{' '}
      <span className="capitalize">{serviceType.toLowerCase()}</span>
    </div>
  );
};
