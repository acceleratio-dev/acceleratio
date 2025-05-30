// import { CircleAlert, CircleCheck, CircleDashed, CirclePause, CircleX } from 'lucide-react';

import {
  ContainerStatus,
  Maybe,
} from '@/app/dashboard/servers/_generated/isSwarmInitializedQuery.generated';

const statusToColor = {
  [ContainerStatus.Running]:
    'bg-emerald-50 text-emerald-600 border-emerald-300',
  [ContainerStatus.Pending]: 'bg-yellow-50 text-yellow-600 border-yellow-300',
  [ContainerStatus.Stopped]: 'bg-slate-50 text-slate-700 border-slate-300',
};

// const statusToIcon = {
//   [ServiceStatus.NotDeployed]: <CirclePause className="w-4" />,
//   [ServiceStatus.Deploying]: <CircleDashed className="w-4" />,
//   [ServiceStatus.Running]: <CircleCheck className="w-4" />,
//   [ServiceStatus.Pending]: <CircleDashed className="w-4" />,
//   [ServiceStatus.Stopped]: <CirclePause className="w-4" />,
//   [ServiceStatus.Error]: <CircleAlert className="w-4" />,
//   [ServiceStatus.Deleted]: <CircleX className="w-4" />,
// };

export const ServiceStatusBadge = ({
  status = ContainerStatus.Stopped,
}: {
  status?: Maybe<ContainerStatus>;
}) => {
  if (!status) return null;

  return (
    <div
      className={`px-2.5 inline-flex py-0.5 text-xs border rounded-md font-medium items-center gap-1.5 ${statusToColor[status]}`}
    >
      <span className="capitalize">{status.toLowerCase()}</span>
    </div>
  );
};
