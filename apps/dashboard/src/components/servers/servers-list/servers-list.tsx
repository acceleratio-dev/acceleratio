'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetNodesQuery } from '@/lib/graphql/generated';
import { Badge } from '@/components/ui/badge';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'sonner';

export const ServersList = () => {
  const { data } = useGetNodesQuery({
    onError: (error) => {
      toast.error('Failed get servers list', {
        description: error.message,
      });
    },
  });

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Servers list</CardTitle>
        <CardDescription>List of the available kubernetes nodes to deploy your services.</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="w-[100px] pl-4">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU / RAM / Storage</TableHead>
                <TableHead className="text-right pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.nodes.map((node) => (
                <TableRow key={node.id}>
                  <TableCell className="font-medium pl-4">{node.id.slice(0, 8)}...</TableCell>
                  <TableCell>
                    <div className="max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">{node.name}</div>
                  </TableCell>
                  <TableCell>{node.ip}</TableCell>
                  <TableCell>
                    {node.status === 'True' ? (
                      <Badge className="bg-emerald-600">Ready</Badge>
                    ) : (
                      <Badge variant={'secondary'}>Not ready</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {node.cpu} cores / {node.ram} GB / {node.storage} GB
                  </TableCell>
                  <TableCell>
                    <Button variant={'outline'} size={'icon'} className="ml-auto flex mr-2">
                      <BsThreeDots />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
