import { ServiceContext } from '@/components/providers/service-provider';
import { useContext } from 'react';
import { ServicePodsMonitoring } from './service-pods-monitoring';

export const Overview = () => {
  const { deployments } = useContext(ServiceContext);
  const latestDeployment = deployments[0];

  return (
    <div className="mt-4 bg-white rounded-lg border flex divide-x">
      <div className="w-full">
        <ServicePodsMonitoring />
      </div>
      <div className="min-w-[300px] max-w-[300px] bg-gray-50 rounded-r-lg divide-y">
        <div className="p-6 space-y-3">
          <div className="text-sm font-medium">Provider</div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">Type</div>
            <div className="text-sm font-medium text-slate-700 capitalize">
              {latestDeployment.provider.toLowerCase()}
            </div>
          </div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">Image</div>
            <div className="text-sm font-medium text-slate-700">{latestDeployment.image}</div>
          </div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">Internal name</div>
            <div className="text-sm font-medium text-slate-700">{latestDeployment.internalName ?? 'N/A'}</div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="text-sm font-medium">Resources</div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">Replicas</div>
            <div className="text-sm font-medium text-slate-700">{latestDeployment.replicas}</div>
          </div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">CPU</div>
            <div className="text-sm font-medium text-slate-700">100m</div>
          </div>
          <div className="flex">
            <div className="text-sm text-gray-500 w-1/2">Memory</div>
            <div className="text-sm font-medium text-slate-700">100Mi</div>
          </div>
        </div>
      </div>
    </div>
  );
};
