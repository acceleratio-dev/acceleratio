'use client';
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';
import {
  CreateProjectInput,
  GetProjectsDocument,
  useCreateProjectMutation,
} from '@/lib/graphql/generated';
import { toast } from 'sonner';

export const CreateProjectDialog = () => {
  const [createProject] = useCreateProjectMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Project created successfully');
    },
    refetchQueries: [{ query: GetProjectsDocument }],
  });

  const handleCreateProject = async (data: CreateProjectInput) => {
    await createProject({
      variables: {
        createProjectInput: data,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-28 w-[340px] border-dashed border-slate-300 bg-gray-50"
          variant="outline"
        >
          <Plus />
          Create new project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          id="create-project-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            handleCreateProject(data as CreateProjectInput);
          }}
        >
          <FormInput label="Project Name" name="name" />
          <FormInput label="Description" name="description" />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-project-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
