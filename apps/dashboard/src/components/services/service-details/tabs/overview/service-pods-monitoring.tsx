import { ServiceContext } from '@/components/providers/service-provider';
import { Pod, PodEventType, useGetServicePodsQuery, useServicePodsSubscription } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useContext, useEffect, useState } from 'react';
import { PodItem } from './pod-item';

export const ServicePodsMonitoring = () => {
  const { service } = useContext(ServiceContext);

  const [pods, setPods] = useState<Pod[]>([]);

  const { data: initialPods, loading } = useGetServicePodsQuery({
    variables: {
      serviceId: service.id,
    },
    onError: (error) => {
      toast.error(error.message);
    },
    fetchPolicy: 'no-cache',
  });

  useServicePodsSubscription({
    variables: {
      serviceId: service.id,
    },
    onData: ({ data }) => {
      const message = data.data?.message;
      if (!message) return;
      switch (message.type) {
        case PodEventType.Created:
          setPods([...pods, message.pod as Pod]);
          break;
        case PodEventType.Updated:
          setPods(pods.map((pod) => (pod.name === (message.pod as Pod).name ? (message.pod as Pod) : pod)));
          break;
        case PodEventType.Deleted:
          setPods(pods.filter((pod) => pod.name !== (message.pod as Pod).name));
          break;
      }
    },
  });

  useEffect(() => {
    if (initialPods) {
      setPods(initialPods.pods);
    }

    return () => {
      setPods([]);
    };
  }, [initialPods]);

  return (
    <div>
      <div className="grid grid-cols-6 divide-x rounded-tl-lg bg-slate-100">
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Name</div>
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Status</div>
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Server</div>
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Image</div>
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Uptime</div>
        <div className="text-xs font-medium text-slate-700 ml-4 py-1">Actions</div>
      </div>
      <div className="divide-y border-y">
        {loading ? <PodSkeletons /> : pods.map((pod) => <PodItem key={pod.name} pod={pod} />)}
      </div>
    </div>
  );
};

const PodSkeletons = () => {
  return (
    <>
      {new Array(3).fill(0).map((_, index) => (
        <div key={index} className="h-12 bg-slate-50 animate-pulse grid grid-cols-5 divide-x">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      ))}
    </>
  );
};
