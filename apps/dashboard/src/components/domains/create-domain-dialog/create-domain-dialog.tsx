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
import { TbPlus } from 'react-icons/tb';
import { FormInput } from '@/components/ui/forms/form-input';
import { useForm } from 'react-hook-form';
import { GetDomainsDocument, useCreateDomainMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useState } from 'react';

type Form = {
  url: string;
};

export const CreateDomainDialog = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Form>({});
  const [createDomain, { loading }] = useCreateDomainMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Domain created successfully');
      reset();
      setOpen(false);
    },
    refetchQueries: [{ query: GetDomainsDocument }],
  });

  const onSubmit = async (data: Form) => {
    await createDomain({ variables: { createDomainInput: { url: data.url } } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={'outline'} size={'sm'}>
          <TbPlus />
          Add domain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add domain</DialogTitle>
          <DialogDescription>You will be able to assigne domain to your services later</DialogDescription>
        </DialogHeader>
        <form id="create-domain-form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Domain" placeholder="example.com" {...register('url')} />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="create-domain-form" disabled={loading}>
            Add domain
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
