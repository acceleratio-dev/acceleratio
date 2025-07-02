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
import { useGetAddNodeCommandQuery } from '@/lib/graphql/generated';
import { Copy } from 'lucide-react';
import { TbPlus } from 'react-icons/tb';
import { toast } from 'sonner';

export const AddServerDialog = () => {
  const { data, loading } = useGetAddNodeCommandQuery({
    onError: (error) => {
      toast.error('Failed to get add server command', {
        description: error.message,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={'outline'} size={'sm'}>
          <TbPlus />
          Add server
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription>Execute this command on the new server</DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 border rounded-lg px-3 py-1 mb-3">
          <div className="flex items-center justify-between">
            <code className="text-xs font-mono text-gray-800 break-all">
              {loading ? 'Loading...' : data?.command || 'No command available'}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(data?.command || '');
                toast.info('Copied to clipboard');
              }}
              className="ml-2 flex-shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
