import { ProjectContext } from '@/components/providers/project-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/forms/form-input';
import { GetServicesByProjectIdDocument, useCreateServiceMutation } from '@/lib/graphql/generated';
import { PlusIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Form = {
  name: string;
};

export const CreateServiceDialog = () => {
  const [open, setOpen] = useState(false);
  const { project } = useContext(ProjectContext);
  const { register, handleSubmit } = useForm<Form>();
  const [createService, { loading }] = useCreateServiceMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Service created');
      setOpen(false);
    },
    refetchQueries: [GetServicesByProjectIdDocument],
  });

  const onSubmit = async (data: Form) => {
    await createService({
      variables: {
        createServiceInput: {
          name: data.name,
          projectId: project.id,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto" size="sm">
          <PlusIcon className="w-4 h-4" />
          Add service
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create service</DialogTitle>
          <DialogDescription>Service is a container that runs your application.</DialogDescription>
        </DialogHeader>

        <form id="create-service-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Service name" placeholder="my-service" {...register('name')} />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-service-form" loading={loading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
