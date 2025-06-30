'use client';
import { Button } from '@/components/ui/button';
import { useUpdateDomainStatusesMutation } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { TbRefresh } from 'react-icons/tb';

export const RefreshDomainStatuses = () => {
  const [updateDomainStatuses, { loading }] = useUpdateDomainStatusesMutation({
    onCompleted: () => {
      toast.info('Domain statuses updated');
    },
    onError: () => {
      toast.error('Failed to update domain statuses');
    },
    refetchQueries: ['GetDomains'],
  });

  return (
    <Button
      className="w-full"
      variant={'outline'}
      size={'sm'}
      onClick={() => updateDomainStatuses()}
      disabled={loading}
    >
      <TbRefresh />
      Refresh statuses
    </Button>
  );
};
