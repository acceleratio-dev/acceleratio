'use client';
import { Button } from '@/components/ui/button';
import {
  useGetProjectServicesQuery,
  useStartServiceDeploymentMutation,
  useStopServiceDeploymentMutation,
} from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { Play, StopCircle } from 'lucide-react';

export const ServicesList = ({ projectId }: { projectId: string }) => {
  const { data, loading } = useGetProjectServicesQuery({
    variables: {
      projectId,
    },
  });
  const [startServiceDeployment, { loading: startServiceDeploymentLoading }] =
    useStartServiceDeploymentMutation({
      onCompleted: () => {
        toast.success('Service deployment started');
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  const [stopServiceDeployment, { loading: stopServiceDeploymentLoading }] =
    useStopServiceDeploymentMutation({
      onCompleted: () => {
        toast.success('Service deployment stopped');
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  if (loading) return <div>Loading...</div>;

  const services = data?.services;

  return (
    <div className="bg-white mt-4 border rounded-md divide-y">
      <div className="h-8 bg-gray-100 rounded-t-md flex items-center divide-x text-slate-700 text-xs font-medium">
        <div className="w-1/2 h-8 px-4 flex items-center justify-between">
          <div>Name</div>
          <div className="w-1/3">Actions</div>
        </div>
        <div className="w-1/2 px-4 flex items-center">
          <div className="w-1/3">Status</div>
          <div className="w-1/3">Provider</div>
          <div className="w-1/3 text-right">Latest Deployment</div>
        </div>
      </div>
      {services?.map((service) => (
        <div key={service.id} className="flex items-center divide-x text-sm">
          <div className="w-1/2 h-12 flex items-center justify-between px-4">
            <div>{service.name}</div>
            <div className="flex items-center gap-2 w-1/3">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  startServiceDeployment({
                    variables: { serviceId: service.id },
                  })
                }
                disabled={startServiceDeploymentLoading}
              >
                <Play />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  stopServiceDeployment({
                    variables: { serviceId: service.id },
                  })
                }
              >
                <StopCircle />
              </Button>
            </div>
          </div>
          <div className="w-1/2 flex items-center px-4">
            <div className="w-1/3">Active</div>
            <div className="w-1/3">Docker</div>
            <div className="w-1/3 text-right">2025-01-01</div>
          </div>
        </div>
      ))}
    </div>
  );
};
