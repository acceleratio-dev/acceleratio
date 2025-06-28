import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TbEdit, TbPlus, TbRefresh } from 'react-icons/tb';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BsThreeDots } from 'react-icons/bs';

export default function Servers() {
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between wrapper">
        <div className="w-3/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Servers list</CardTitle>
              <CardDescription>List of the available kubernetes nodes to deploy your services.</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className='bg-slate-100 hover:bg-slate-100'>
                      <TableHead className="w-[100px] pl-4">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium pl-4">1</TableCell>
                      <TableCell>docker-desktop</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                      <TableCell>Ready</TableCell>
                      <TableCell>
                        <Button variant={'outline'} size={'icon'} className="ml-auto flex mr-2">
                          <BsThreeDots />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage servers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant={'outline'} size={'sm'}>
                <TbPlus />
                Add server
              </Button>
              <Button className="w-full" variant={'outline'} size={'sm'}>
                <TbRefresh />
                Refresh statuses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
