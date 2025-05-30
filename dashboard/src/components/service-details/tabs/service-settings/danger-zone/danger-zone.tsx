import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const DangerZone = ({ serviceId }: { serviceId: string }) => {
  const router = useRouter();

  return (
    <div className="bg-red-50 border border-red-300 rounded-md w-[600px]">
      <div className="text-sm px-4 py-2 text-red-600 font-medium border-b border-red-300">
        Danger zone
      </div>
      <div className="p-4 space-y-4">
        <div className="text-sm text-neutral-950/95">
          Are you sure you want to delete this service? This action cannot be
          undone. And will remove all data associated with it.
        </div>
        <div>
          <Button
            variant={'destructive'}
            className="flex ml-auto"
            size={'sm'}
            // disabled={loading}
            // onClick={() => triggerMutation({ variables: { id: projectId } })}
          >
            Delete project
          </Button>
        </div>
      </div>
    </div>
  );
};
