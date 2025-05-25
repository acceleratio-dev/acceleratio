'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useGetNodesQuery } from './_generated/getNodesQuery.generated';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const headers = [
  'Server',
  'IP',
  'Status',
  'Installation Completed',
  'Created At',
  '',
];

export const ServersTable = () => {
  const { data, loading } = useGetNodesQuery({
    onError: (error) => toast.error(error.message),
  });

  if (loading) {
    return <LoadingState />;
  }

  return (
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
          {data?.getNodes.map((node) => (
            <TableRow key={node._id}>
              <TableCell className="font-medium">{node.name}</TableCell>
              <TableCell>{node.ip}</TableCell>
              <TableCell>{node.status}</TableCell>
              <TableCell>Yes</TableCell>
              <TableCell>{new Date(node.createdAt).toLocaleString('en-US')}</TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <MoreHorizontal />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const LoadingState = () => (
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
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            {headers.map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-4 w-[80%]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
