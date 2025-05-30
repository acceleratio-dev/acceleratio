import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  GetServiceDeploymentsDocument,
  ServiceWithDeployment,
} from '../../service-deployments/_generated/getServiceDeploymentsQuery.generated';
import { useUpdateServiceConfigMutation } from '../methods/_generated/updateServiceConfigMutation.generated';
import { toast } from 'sonner';
import { GetServiceByIdDocument } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';
import { ServiceSettingsTitle } from '../components/service-settings-title';

export const GeneralInfo = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const latestDeployment = service.draftDeployment || service.activeDeployment;

  const [updateServiceConfig, { loading }] = useUpdateServiceConfigMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Service config updated');
    },
    refetchQueries: [
      {
        query: GetServiceDeploymentsDocument,
        variables: {
          serviceId: service._id,
        },
      },
      {
        query: GetServiceByIdDocument,
        variables: {
          id: service._id,
        },
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const config = Object.fromEntries(formData.entries());

    updateServiceConfig({
      variables: {
        serviceId: service._id,
        config: {
          image: config.image as string,
          cpuLimit: config.cpuLimit ? Number(config.cpuLimit) : null,
          memoryLimit: config.memoryLimit ? Number(config.memoryLimit) : null,
        },
      },
    });
  };
  return (
    <div className="w-[600px] space-y-4">
      <div>
        <ServiceSettingsTitle title="General information" />
        <form
          id="update-service-config-form"
          className="bg-slate-50 p-4 pt-2 border rounded-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Docker image</Label>
            <Input
              className="bg-white"
              placeholder="Docker image"
              defaultValue={latestDeployment?.config?.image || ''}
              name="image"
            />
          </div>
          <div>
            <Label>CPU Limit (in vCPUs)</Label>
            <Input
              className="bg-white"
              placeholder="CPU Limit"
              defaultValue={latestDeployment?.config?.cpuLimit || ''}
              name="cpuLimit"
            />
          </div>
          <div>
            <Label>RAM Limit (in MB)</Label>
            <Input
              className="bg-white"
              placeholder="Memory Limit"
              defaultValue={latestDeployment?.config?.memoryLimit || ''}
              name="memoryLimit"
            />
          </div>
        </form>
      </div>

      <Button
        className="flex ml-auto"
        type="submit"
        form="update-service-config-form"
        disabled={loading}
      >
        Save changes
      </Button>
    </div>
  );
};
