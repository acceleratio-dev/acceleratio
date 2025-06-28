import { DashboardLayout } from '@/components/dashboard-layout';
import { CreateDomainDialog } from '@/components/domains/create-domain-dialog';
import { DomainsList } from '@/components/domains/domains-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TbRefresh } from 'react-icons/tb';

export default function Domains() {
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between wrapper">
        <div className="w-3/4">
          <DomainsList />
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CreateDomainDialog />
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
