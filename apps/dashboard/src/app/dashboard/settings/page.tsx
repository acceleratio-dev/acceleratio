import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="wrapper flex justify-between gap-4">
        <Card className='w-3/4'>
          <CardHeader className='border-b'>
            <CardTitle>Account settings</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
          </CardHeader>
        </Card>
        
        <div className='w-1/4'>
          <Card>
            <CardHeader className='border-b'>
              <CardTitle>Sections</CardTitle>
              <CardDescription>
                Select the sections you want to manage.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-2'>
              <Button variant='outline' className='w-full' size='sm'>
                Account
              </Button>
              <Button variant='outline' className='w-full' size='sm'>
                Appearance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
