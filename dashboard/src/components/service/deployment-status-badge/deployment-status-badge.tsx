import { DeploymentStatus } from '@/components/projects/projects-list/_generated/getProjectsQuery.generated';

const statusToColor = {
  [DeploymentStatus.Active]:
    'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-emerald-400/25',
  [DeploymentStatus.Draft]:
    'bg-orange-50 border-orange-300 text-orange-600 shadow-orange-400/25',
  [DeploymentStatus.Finished]:
    'bg-slate-50 border-slate-300 text-slate-600 shadow-slate-400/25',
};

export const DeploymentStatusBadge = ({
  status,
}: {
  status: DeploymentStatus;
}) => {
  return (
    <div
      className={`border text-xs inline-flex shadow-sm rounded-lg px-2.5 py-0.5 capitalize font-medium ${statusToColor[status]}`}
    >
      {status.toLowerCase()}
    </div>
  );
};
