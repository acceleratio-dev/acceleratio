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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAssignDomainToServiceMutation, useGetDomainsQuery } from '@/lib/graphql/generated';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { ServiceContext } from '@/components/providers/service-provider';
import { toast } from 'sonner';

type Form = {
  domain: string;
  path: string;
  port: string;
  stripPath: boolean;
};

export const AssignDomainDialog = () => {
  const { service } = useContext(ServiceContext);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, watch, setValue, reset } = useForm<Form>({
    defaultValues: {
      domain: '',
      path: '',
      port: '',
      stripPath: false,
    },
  });
  const { data: domains } = useGetDomainsQuery({
    fetchPolicy: 'no-cache',
  });
  const [assignDomainToService] = useAssignDomainToServiceMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Domain assigned to service');
      setIsOpen(false);
      reset();
    },
    refetchQueries: ['GetServiceDomains'],
  });

  const onSubmit = handleSubmit((data) => {
    assignDomainToService({
      variables: {
        assignDomainInput: {
          domainId: data.domain,
          serviceId: service.id,
          path: data.path,
          port: Number(data.port),
          stripPath: data.stripPath,
        },
      },
    });
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          Assign domain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign domain to service</DialogTitle>
          <DialogDescription>
            You can add domains in{' '}
            <Link href="/dashboard/domains" className="font-medium underline hover:text-black">
              Domains
            </Link>{' '}
            section
          </DialogDescription>
        </DialogHeader>

        <form id="assign-domain-form" className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="domain" className="mb-2">
              Domain
            </Label>
            <Select value={watch('domain')} onValueChange={(value) => setValue('domain', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                {domains?.domains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.url}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormInput label="Path (leave empty for root)" {...register('path')} placeholder="e.g. /api" />
          <FormInput label="Port" {...register('port')} placeholder="e.g. 80" />
          <div className="flex items-center space-x-2">
            <Switch
              id="strip-path"
              checked={watch('stripPath')}
              onCheckedChange={(checked) => setValue('stripPath', checked)}
            />
            <Label htmlFor="strip-path">Strip path prefix</Label>
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
