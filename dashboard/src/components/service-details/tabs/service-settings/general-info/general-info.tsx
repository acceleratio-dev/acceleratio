import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceWithDeployment } from '../../service-deployments/_generated/getServiceDeploymentsQuery.generated';
import { useUpdateServiceConfigMutation } from '../methods/_generated/updateServiceConfigMutation.generated';
import { toast } from 'sonner';
import { client } from '@/lib/apolloClient';

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
      client.refetchQueries({
        include: ['GetServiceDeployments', 'getServiceById'],
      });
    },
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
      <div className="bg-slate-50 border border-slate-300 rounded-md">
        <div className="text-sm px-4 py-2 text-slate-900 font-medium border-b border-slate-300">
          General information
        </div>
        <div className="p-4 space-y-4">
          <div>
            <Label>Project name</Label>
            <Input
              className="bg-white"
              defaultValue={service.name}
              name="name"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="font-medium text-sm mb-1 ml-4">
          Provider information
        </div>
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
            <Label>CPU Limit</Label>
            <Input
              className="bg-white"
              placeholder="CPU Limit"
              defaultValue={latestDeployment?.config?.cpuLimit || ''}
              name="cpuLimit"
            />
          </div>
          <div>
            <Label>RAM Limit</Label>
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
