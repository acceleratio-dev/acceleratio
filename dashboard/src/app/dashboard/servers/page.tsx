import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { HardDriveDownload, Plus, RefreshCcw } from 'lucide-react';
import { PageHeader } from '@/components/layouts/PageHeader';
import { ServersTable } from '@/components/servers/servers-table';
import { client } from '@/lib/apolloClient';
import { IsSwarmInitializedDocument } from './_generated/isSwarmInitializedQuery.generated';
import { InitSwarmContainer } from '@/components/servers/init-swarm-container';

export default async function ServersPage() {
  const { data, error } = await client.query({
    query: IsSwarmInitializedDocument,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data.isSwarmInitialized) {
    return (
      <DashboardLayout>
        <PageHeader title="Servers" />
        <div className="wrapper">
          <InitSwarmContainer />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader title="Servers" />
      <div className="wrapper flex gap-4">
        <div className="w-full">
          <ServersTable />
        </div>
        <div>
          <div className="w-[280px] border rounded-md shadow-sm">
            <div className="bg-slate-200/70 h-9 pl-4 flex items-center text-sm text-slate-600 font-medium">
              Actions
            </div>
            <div className="p-4 space-y-2">
              <Button variant="outline" className="w-full">
                <RefreshCcw />
                Refresh all statuses
              </Button>
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
