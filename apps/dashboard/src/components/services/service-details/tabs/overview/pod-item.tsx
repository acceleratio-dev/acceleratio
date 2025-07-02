import { Button } from '@/components/ui/button';
import { GetServicePodsQuery, useRestartPodMutation } from '@/lib/graphql/generated';
import { LuLogs } from 'react-icons/lu';
import { MdRestartAlt } from 'react-icons/md';
import { PodsContext } from '../../pods-logs/pods-provider';
import { useContext } from 'react';
import { ServiceContext } from '@/components/providers/service-provider';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import moment from 'moment';

export const PodItem = ({ pod }: { pod: GetServicePodsQuery['pods'][number] }) => {
  const { setPodName } = useContext(PodsContext);
  const { service } = useContext(ServiceContext);
  const [restartPod, { loading: restartLoading }] = useRestartPodMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.info('Pod restarted');
    },
  });

  const handleLogs = (podName: string) => {
    setPodName(null);
    setTimeout(() => {
      setPodName(podName);
    }, 100);
  };

  const handleRestart = (podName: string) => {
    restartPod({ variables: { podName, serviceId: service.id } });
  };

  return (
    <div className="divide-x h-12 text-sm grid grid-cols-6">
      <div className="h-12 flex items-center pl-4">...{pod.name.slice(pod.name.length - 5)}</div>
      <div className="pl-4 h-12 flex items-center">{pod.status}</div>
      <div className='px-4 flex items-center'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-full">
                {pod.node}
              </div>
            </TooltipTrigger>
            <TooltipContent>{pod.node}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="pl-4 h-12 flex items-center">{pod.image}</div>
      <div className="pl-4 h-12 flex items-center">
        {pod.startTime !== 'N/A' ? moment(Number(pod.startTime)).fromNow(true) : 'N/A'}
      </div>
      <div className="pl-4 h-12 flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="shadow-none" variant="outline" size="icon" onClick={() => handleLogs(pod.name)}>
                <LuLogs />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View logs</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="shadow-none"
                variant="outline"
                size="icon"
                disabled={restartLoading}
                onClick={() => handleRestart(pod.name)}
              >
                <MdRestartAlt />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Restart pod</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
