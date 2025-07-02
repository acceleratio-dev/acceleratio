'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetNodesQuery } from '@/lib/graphql/generated';
import { Badge } from '@/components/ui/badge';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { DeleteServerDialog } from './delete-server-dialog';
import { useState } from 'react';

export const ServersList = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<{ id: string; name: string; ip: string } | null>(null);

  const { data, loading } = useGetNodesQuery({
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
              {loading ? (
                <ServersListSkeleton />
              ) : (
                data?.nodes.map((node) => (
                  <TableRow key={node.id}>
                    <TableCell className="font-medium pl-4">{node.id.slice(0, 7)}...</TableCell>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={'outline'} size={'icon'} className="ml-auto flex mr-2">
                            <BsThreeDots />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Server actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {/* <EditServerDialog server={node} /> */}
                          <DropdownMenuItem
                            variant={'destructive'}
                            onClick={() => {
                              setSelectedServer({ id: node.id, name: node.name, ip: node.ip });
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <BiSolidTrashAlt />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {selectedServer && (
        <DeleteServerDialog server={selectedServer} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
      )}
    </Card>
  );
};

const ServersListSkeleton = () => {
  return (
    <>
      {new Array(5).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="pl-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </TableCell>
          <TableCell>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
          </TableCell>
          <TableCell>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-8 ml-auto mr-2"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
