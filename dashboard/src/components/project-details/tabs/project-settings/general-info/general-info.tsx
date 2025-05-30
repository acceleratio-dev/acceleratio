import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const GeneralInfo = () => {
  return (
    <div className="w-[600px]">
      <div className="bg-slate-50 border border-slate-300 rounded-md">
        <div className="text-sm px-4 py-2 text-slate-900 font-medium border-b border-slate-300">
          General information
        </div>
        <div className="p-4 space-y-4">
          <div>
            <Label>Project name</Label>
            <Input className="bg-white" />
          </div>
          <div>
            <Label>Description</Label>
            <Input className="bg-white" />
          </div>
        </div>
      </div>
      <Button className="flex ml-auto mt-4">Save changes</Button>
    </div>
  );
};
