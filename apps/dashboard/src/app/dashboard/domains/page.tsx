import { DashboardLayout } from '@/components/dashboard-layout';
import { CreateDomainDialog } from '@/components/domains/create-domain-dialog';
import { DomainsList } from '@/components/domains/domains-list';
import { InstructionSteps } from '@/components/domains/instruction-steps';
import { RefreshDomainStatuses } from '@/components/domains/refresh-domain-statuses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Domains() {
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between wrapper">
        <div className="w-3/4 space-y-4">
          <DomainsList />
          <InstructionSteps />
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CreateDomainDialog />
              <RefreshDomainStatuses />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
