import { ServiceContext } from '@/components/providers/service-provider';
import { useDeployServiceMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useContext } from 'react';

export const UpdateHint = () => {
  const { service } = useContext(ServiceContext);
  const [deployService, { loading: deployLoading }] = useDeployServiceMutation({
    onCompleted: () => {
      toast.success('Service deployed');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeploy = () => {
    toast.info('Deploying service...');
    deployService({ variables: { serviceId: service.id } });
  };

  return (
    <div className="h-8 rounded-b-lg bg-yellow-50/90 flex items-center justify-center text-sm text-yellow-600 border border-yellow-300">
      You have new updates.{' '}
      <button className="cursor-pointer font-medium underline ml-1" onClick={handleDeploy}>
        Deploy them
      </button>
    </div>
  );
};
