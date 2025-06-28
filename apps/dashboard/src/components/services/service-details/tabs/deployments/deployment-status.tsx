import { ServiceDeploymentStatus } from '@/lib/graphql/generated';

const statusColors = {
  [ServiceDeploymentStatus.Draft]: 'bg-orange-50 text-orange-600 border-orange-200',
  [ServiceDeploymentStatus.Active]: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  [ServiceDeploymentStatus.Finished]: 'bg-slate-50 text-slate-600 border-slate-200',
};

export const DeploymentStatus = ({ status }: { status: ServiceDeploymentStatus }) => {
  return (
    <div>
      <div className={`text-xs inline-block w-18 text-center py-0.5 border rounded-sm font-medium ${statusColors[status]}`}>{status}</div>
    </div>
  );
};
