import { DeploymentStatusBadge } from '@/components/service/deployment-status-badge';
import { useGetServiceDeploymentsQuery } from './_generated/getServiceDeploymentsQuery.generated';

export const ServiceDeployments = ({ serviceId }: { serviceId: string }) => {
  const { data, loading, error } = useGetServiceDeploymentsQuery({
    variables: { serviceId },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center px-4 gap-4 border-b h-10 bg-slate-50">
        <div className="w-1/2 border-r h-10 flex items-center">
          <div className="text-sm font-medium">Date</div>
        </div>
        <div className="w-1/2 flex items-center">
          <div className="text-sm font-medium w-1/4">Status</div>
          <div className="text-sm font-medium w-1/4">Image</div>
          <div className="text-sm font-medium w-1/4">Duration</div>
          <div className="text-sm font-medium w-1/4">Container Status</div>
        </div>
      </div>
      {data?.deployments.map((deployment) => (
        <div
          className="flex justify-between items-center px-4 h-14 gap-4 border-b"
          key={deployment._id}
        >
          <div className="w-1/2 border-r h-14 flex items-center">
            <div className='space-y-0.5'>
              <div className="text-sm font-medium">
                {new Date(deployment.createdAt).toLocaleString()}
              </div>
              <div className="text-xs text-slate-700">{deployment._id}</div>
            </div>
          </div>
          <div className="flex w-1/2 text-sm">
            <div className="w-1/4">
              <DeploymentStatusBadge status={deployment.status} />
            </div>
            <div className="w-1/4">{deployment.config.image}</div>
            <div className="w-1/4">-</div>
            <div className="w-1/4 text-sm text-slate-700">
              {deployment?.containerStatus || 'Not running'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
