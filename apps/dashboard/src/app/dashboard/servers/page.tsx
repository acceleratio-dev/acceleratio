import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TbPlus, TbRefresh } from 'react-icons/tb';
import { ServersList } from '@/components/servers/servers-list';
import { AddServerDialog } from '@/components/servers/add-server-dialog';

export default function Servers() {
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between wrapper">
        <div className="w-3/4">
          <ServersList />
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage servers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <AddServerDialog />
              {/* <Button className="w-full" variant={'outline'} size={'sm'}>
                <TbRefresh />
                Refresh servers
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
