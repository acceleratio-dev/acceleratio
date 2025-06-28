import { Button } from '@/components/ui/button';
import { RiPlayLargeFill } from 'react-icons/ri';
import { PiStopCircleBold } from 'react-icons/pi';
import { useDeployServiceMutation, useStopServiceMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';

export const ServiceActions = ({ serviceId }: { serviceId: string }) => {
  const [deployService, { loading: deployLoading }] = useDeployServiceMutation({
    onCompleted: () => {
      toast.success('Service deployed');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [stopService, { loading: stopLoading }] = useStopServiceMutation({
    onCompleted: () => {
      toast.success('Service stopped');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={() => stopService({ variables: { serviceId } })} disabled={stopLoading}>
        Stop
        <PiStopCircleBold className="fill-red-700 !size-4.5" />
      </Button>
      <Button variant="outline" onClick={() => deployService({ variables: { serviceId } })} disabled={deployLoading}>
        Deploy
        <RiPlayLargeFill className="fill-emerald-700" />
      </Button>
    </div>
  );
};
