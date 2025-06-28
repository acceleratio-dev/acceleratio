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
import { TbPlus } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { useCreateProjectMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useState } from 'react';

type Form = {
  name: string;
  description: string;
};

export const CreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Form>();
  const [createProject, { loading }] = useCreateProjectMutation({
    onCompleted: () => {
      setIsOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: ['GetProjects'],
  });

  const onSubmit = (data: Form) => {
    createProject({
      variables: {
        input: data,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer">
        <div className="bg-gray-50 hover:bg-gray-100 border h-[130px] border-dashed rounded-lg shadow-sm flex items-center justify-center">
          <div className="text-sm flex items-center gap-2 font-medium text-slate-700">
            <TbPlus />
            New project
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Each project has isolated environments.</DialogDescription>
        </DialogHeader>
        <form id="create-project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput label="Name" placeholder="e.g. My project" {...register('name')} />
          <FormInput label="Description" placeholder="e.g. My project description" {...register('description')} />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-project-form" loading={loading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
