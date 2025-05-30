import { Button } from '@/components/ui/button';
import { ServiceWithDeployment } from '../tabs/service-deployments/_generated/getServiceDeploymentsQuery.generated';
import { useStartServiceMutation } from './methods/_generated/startServiceMutation.generated';
import { toast } from 'sonner';
import { useStopServiceMutation } from './methods/_generated/stopServiceMutation.generated';

export const ServiceActions = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const [startService, { loading }] = useStartServiceMutation({
    onCompleted: () => {
      toast.success('Service started');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [stopService, { loading: stopLoading }] = useStopServiceMutation({
    onCompleted: () => {
      toast.success('Service stopped');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => startService({ variables: { serviceId: service._id } })}
        disabled={loading}
      >
        Start
      </Button>
      <Button
        variant="outline"
        onClick={() => stopService({ variables: { serviceId: service._id } })}
        disabled={stopLoading}
      >
        Stop
      </Button>
    </div>
  );
};
