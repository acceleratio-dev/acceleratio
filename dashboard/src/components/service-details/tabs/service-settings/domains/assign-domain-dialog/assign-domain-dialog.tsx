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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const AssignDomainDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add domain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign domain</DialogTitle>
          <DialogDescription>
            Assign a domain to specific port of your service.
          </DialogDescription>
        </DialogHeader>

        <form id="assign-domain-form">
          <div>
            <Label>Domain</Label>
            <Input />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="assign-domain-form">
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
