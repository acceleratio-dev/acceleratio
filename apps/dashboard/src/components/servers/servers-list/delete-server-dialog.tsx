'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRemoveNodeMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { BiSolidTrashAlt } from 'react-icons/bi';

interface DeleteServerDialogProps {
  server: {
    id: string;
    name: string;
    ip: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteServerDialog = ({ server, open, onOpenChange }: DeleteServerDialogProps) => {
  const [removeNode, { loading }] = useRemoveNodeMutation({
    onCompleted: () => {
      toast.success('Server deleted successfully');
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error('Failed to delete server', {
        description: error.message,
      });
    },
    refetchQueries: ['GetNodes'],
  });

  const handleDelete = () => {
    removeNode({
      variables: {
        nodeId: server.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Delete Server
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the server <strong>{server.name}</strong> ({server.ip})? This action cannot
            be undone and will remove the server from your cluster.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Server'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
