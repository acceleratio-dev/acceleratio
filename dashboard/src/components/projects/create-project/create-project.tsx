'use client';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useCreateProjectMutation } from './_generated/createProjectMutation.generated';
import { toast } from 'sonner';
import { useState } from 'react';

export const CreateProject = ({ refetch }: { refetch: () => void }) => {
  const [open, setOpen] = useState(false);
  const [createProject, { loading }] = useCreateProjectMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: (data) => {
      toast.success('Project created successfully');
      setOpen(false);
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = (formData.get('name') as string) || '';
    const description = (formData.get('description') as string) || '';
    createProject({ variables: { createProjectInput: { name, description } } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-26 w-[340px] border-dashed border-slate-300 bg-gray-50" variant="outline">
          <Plus />
          Create new project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill the form below to continue.
          </DialogDescription>
        </DialogHeader>
        <form id="create-project-form" onSubmit={handleSubmit}>
          <div className="space-y-4 mb-2">
            <div>
              <Label>Project Name</Label>
              <Input name="name" />
            </div>
            <div>
              <Label>Project Description</Label>
              <Input name="description" />
            </div>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-project-form" disabled={loading}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
