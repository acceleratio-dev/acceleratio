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
import { useForm } from 'react-hook-form';
import { GoPlus } from 'react-icons/go';
import { useState } from 'react';
import { EnvironmentVariableScope, useCreateEnvironmentVariableMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';

type Form = {
  name: string;
  value: string;
};

interface Props {
  scope: EnvironmentVariableScope;
  serviceId?: string;
  projectId?: string;
}

export const CreateEnvironmentDialog = ({ scope, serviceId, projectId }: Props) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<Form>();
  const [createEnvironmentVariable, { loading }] = useCreateEnvironmentVariableMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Environment variable created');
      setOpen(false);
    },
    refetchQueries: ['GetServiceEnvironmentVariables'],
  });

  const onSubmit = handleSubmit((data) => {
    createEnvironmentVariable({
      variables: {
        createEnvironmentVariableInput: {
          name: data.name,
          value: data.value,
          scope,
          serviceId,
          projectId,
        },
      },
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <GoPlus />
          Create variable
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create environment variable</DialogTitle>
          <DialogDescription>After creating, restart the service to apply the changes.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" id="create-environment-form" onSubmit={onSubmit}>
          <FormInput label="Name" placeholder="e.g. EXAMPLE_NAME" {...register('name')} />
          <FormInput label="Value" placeholder="e.g. value" {...register('value')} />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-environment-form" disabled={loading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
