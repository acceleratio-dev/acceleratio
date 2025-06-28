import { ServiceContext } from '@/components/providers/service-provider';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/forms/form-input';
import { ServiceDeploymentProvider, useUpdateServiceDeploymentMutation } from '@/lib/graphql/generated';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DomainsSettings } from './domains-settings';
import { DangerZone } from './danger-zone';

type Form = {
  provider: ServiceDeploymentProvider;
  image: string;
  replicas: number;
  internalName: string;
};

export const Settings = () => {
  const { service, deployments } = useContext(ServiceContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm<Form>();
  const [updateServiceDeployment, { loading }] = useUpdateServiceDeploymentMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Deployment updated');
    },
  });

  useEffect(() => {
    reset({
      provider: ServiceDeploymentProvider.Docker,
      image: deployments[0]?.image ?? '',
      replicas: deployments[0]?.replicas ?? 1,
      internalName: deployments[0]?.internalName ?? '',
    });
  }, [deployments]);

  const onSubmit = (data: Form) => {
    updateServiceDeployment({
      variables: {
        updateServiceDeploymentInput: {
          serviceId: service.id,
          ...data,
          replicas: Number(data.replicas),
        },
      },
    });
  };

  return (
    <div className="mt-4 bg-white rounded-lg border overflow-hidden relative">
      <form id="deployment-form" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`fixed ${
            isDirty ? 'bottom-10 opacity-100' : '-bottom-16 opacity-0'
          } left-1/2 ml-7 -translate-x-1/2 transition-all duration-300 flex items-center justify-between w-2xl bg-white rounded-md shadow-black/25 shadow-md p-2 pl-4 border border-slate-300 z-10`}
        >
          <div className="text-sm font-medium">You have unsaved changes</div>
          <div className="flex">
            <Button variant="outline" type="button" className="mr-2" onClick={() => reset()}>
              Discard
            </Button>
            <Button type="submit" form="deployment-form" disabled={loading}>
              Save changes
            </Button>
          </div>
        </div>
        <div className="p-6 max-w-2xl mx-auto space-y-12 relative">
          <div>
            <div className="text-lg font-medium">Provider settings</div>
            <div className="text-sm text-slate-500">
              The provider is the service that will be used to deploy the service.
            </div>
            <div className="space-y-4 mt-6">
              <FormInput label="Provider (Github coming soon...)" {...register('provider')} disabled />
              <FormInput label="Docker Image" {...register('image')} />
              <FormInput label="Service Internal name" {...register('internalName')} />
            </div>
          </div>

          <DomainsSettings />

          <div>
            <div className="text-lg font-medium">Resources</div>
            <div className="text-sm text-slate-500">
              The number of replicas is the number of pods that will be running for this service.
            </div>
            <div className="space-y-4 mt-4">
              <FormInput label="Replicas" {...register('replicas')} />
              <FormInput label="CPU Limit" placeholder="Unlimited" />
              <FormInput label="RAM Limit" placeholder="Unlimited" />
            </div>
          </div>
          {/* <Button type="submit" form="deployment-form" disabled={loading} className="w-full">
            Save changes
          </Button> */}

          <DangerZone />
        </div>
      </form>
    </div>
  );
};
