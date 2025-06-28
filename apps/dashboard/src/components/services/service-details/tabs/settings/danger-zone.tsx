import { Button } from '@/components/ui/button';
import { FaTriangleExclamation } from 'react-icons/fa6';

export const DangerZone = () => {
  return (
    <div className="bg-red-50 p-4 rounded-md border border-red-300 flex items-center justify-between">
      <div>
        <div className="text-lg font-medium text-red-700">Danger zone</div>
        <div className="text-sm text-red-700">
          These action are irreversible and will also delete all related data.
        </div>
      </div>
      <Button variant="destructive" size="sm">
        <FaTriangleExclamation />
        Delete service
      </Button>
    </div>
  );
};
