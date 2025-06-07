'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form-input';
import {
  DeploymentProvider,
  GetProjectServicesDocument,
  useCreateServiceMutation,
} from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useState } from 'react';

export const CreateServiceDialog = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [createService, { loading }] = useCreateServiceMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Service created');
      setOpen(false);
    },
    refetchQueries: [
      { query: GetProjectServicesDocument, variables: { projectId } },
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    await createService({
      variables: {
        createServiceInput: {
          name,
          projectId: projectId,
          deploymentProvider: DeploymentProvider.Docker,
          config: {
            image: 'nginx:latest',
          },
        },
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="create-service-form">
          <FormInput name="name" label="Name" />
          {/* <FormInput name="deploymentProvider" label="Deployment Provider" /> */}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-service-form" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
