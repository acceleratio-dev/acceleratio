import { ServiceContext } from '@/components/providers/service-provider';
import { DeploymentStatus } from './deployment-status';
import moment from 'moment';
import { useContext } from 'react';

export const Deployments = () => {
  const { deployments } = useContext(ServiceContext);
  return (
    <div className="mt-4 bg-white rounded-lg border divide-y min-h-[300px]">
      <div className="px-4 h-8 flex divide-x items-center text-xs font-medium bg-slate-50 rounded-t-lg text-slate-600">
        <div className="w-1/2 h-8 leading-8">ID</div>
        <div className="w-1/2 pl-4 grid grid-cols-3">
          <div>Status</div>
          <div>Replicas</div>
          <div>Last updated</div>
        </div>
      </div>
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className="px-4 h-12 flex divide-x items-center text-sm font-medium bg-white rounded-t-lg text-slate-600"
        >
          <div className="w-1/2 h-12 leading-12">{deployment.id}</div>
          <div className="w-1/2 pl-4 grid grid-cols-3">
            <DeploymentStatus status={deployment.status} />
            <div>{deployment.replicas}</div>
            <div>{moment(deployment.updatedAt).fromNow()}</div>
          </div>
        </div>
      ))}
      <div className="h-2" />
    </div>
  );
};
