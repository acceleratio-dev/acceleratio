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
import { useAssignDomainMutation } from './_generated/assignDomainMutation.generated';
import { toast } from 'sonner';
import { GetServiceByIdDocument } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';

export const AssignDomainDialog = ({ serviceId }: { serviceId: string }) => {
  const [assignDomain, { loading }] = useAssignDomainMutation({
    onCompleted: () => {
      toast.success('Domain assigned');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GetServiceByIdDocument,
        variables: {
          id: serviceId,
        },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const domain = (formData.get('domain') as string) || '';
    const path = (formData.get('path') as string) || '';
    const port = (formData.get('port') as string) || '';
    await assignDomain({
      variables: {
        input: {
          domain: { domain, path, port: parseInt(port) },
          serviceId,
        },
      },
    });
  };

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

        <form
          id="assign-domain-form"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Domain</Label>
            <Input name="domain" placeholder="example.com" />
          </div>
          <div>
            <Label>Path</Label>
            <Input name="path" placeholder="/" />
          </div>
          <div>
            <Label>Port</Label>
            <Input name="port" placeholder="80" />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="assign-domain-form" disabled={loading}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
