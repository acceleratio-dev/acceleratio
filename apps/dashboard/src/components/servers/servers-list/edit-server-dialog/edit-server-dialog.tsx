// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
// import { FormInput } from '@/components/ui/forms/form-input';
// import { GetNodesQuery, useRenameNodeMutation } from '@/lib/graphql/generated';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { MdEdit } from 'react-icons/md';
// import { toast } from 'sonner';

// type Form = {
//   name: string;
// };

// export const EditServerDialog = ({ server }: { server: GetNodesQuery['nodes'][number] }) => {
//   const [open, setOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm<Form>({
//     defaultValues: {
//       name: server.name,
//     },
//   });
//   const [renameNode, { loading }] = useRenameNodeMutation({
//     onCompleted: () => {
//       toast.success('Server name updated');
//       reset();
//       setOpen(false);
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });

//   const onSubmit = async (data: Form) => {
//     await renameNode({
//       variables: {
//         nodeId: server.id,
//         newName: data.name,
//       },
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
//           <MdEdit />
//           Edit
//         </DropdownMenuItem>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit server</DialogTitle>
//           <DialogDescription>Edit the server name</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} id="edit-server-form">
//           <FormInput label="Server name" {...register('name')} />
//         </form>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant={'outline'}>Cancel</Button>
//           </DialogClose>
//           <Button type="submit" form="edit-server-form" disabled={loading}>
//             Save
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
