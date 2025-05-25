import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { HardDriveDownload, MoreHorizontal, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHeader } from '@/components/layouts/PageHeader';

const headers = [
  'Server',
  'IP',
  'Status',
  'Installation Completed',
  'Created At',
  '',
];

export default function ServersPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Servers" />
      <div className="wrapper flex gap-4">
        <div className="w-full">
          <div className="border rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="!bg-slate-200/70">
                <TableRow>
                  {headers.map((header) => (
                    <TableHead className="text-slate-600 h-9" key={header}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Server name</TableCell>
                  <TableCell>0.0.0.0</TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>2025-01-01 12:00:00</TableCell>
                  <TableCell>
                    <Button size="icon" variant="outline">
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <div className="w-[280px] border rounded-md shadow-sm">
            <div className="bg-slate-200/70 h-9 pl-4 flex items-center text-sm text-slate-600 font-medium">
              Actions
            </div>
            <div className="p-4 space-y-2">
              <Button variant="outline" className="w-full">
                <Plus />
                Add new server
              </Button>
              <Button variant="outline" className="w-full">
                <HardDriveDownload />
                Init current server
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
