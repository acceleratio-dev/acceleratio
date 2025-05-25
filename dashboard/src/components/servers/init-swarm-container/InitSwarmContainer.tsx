'use client';

import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client';
import { InitSwarmDocument } from './_generated/initSwarmQuery.generated';
import { toast } from 'sonner';

export const InitSwarmContainer = () => {
  const [initSwarm, { loading }] = useMutation(InitSwarmDocument, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleInitSwarm = async () => {
    const { data } = await initSwarm();
    if (data?.initSwarm) {
      toast.success('Cluster initialized');
    } else {
      toast.error(
        'Failed to initialize cluster, please check if docker is running and try again',
      );
    }
  };

  return (
    <div className="bg-slate-50 border shadow-sm rounded-md p-4 space-y-4 max-w-md mx-auto text-center">
      <div className="text-xl font-medium text-slate-800 leading-none">
        Cluster is not initialized
      </div>
      <div className="text-sm text-slate-600">
        To start using the application, you need to initialize the cluster.
        After process finish current server will be added to the cluster and you
        will be able to use him as a node.
      </div>
      <Button
        variant="outline"
        className="block mx-auto leading-none"
        onClick={handleInitSwarm}
        disabled={loading}
      >
        Initialize cluster
      </Button>
    </div>
  );
};
