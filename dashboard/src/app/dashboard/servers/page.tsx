'use client';
import { Button } from '@/components/ui/button';
import { HardDriveDownload, Plus, RefreshCcw } from 'lucide-react';
import { ServersTable } from '@/components/servers/servers-table';
import { InitSwarmContainer } from '@/components/servers/init-swarm-container';
import { useIsSwarmInitializedQuery } from './_generated/isSwarmInitializedQuery.generated';
import { ContentLoader } from '@/components/layouts/ContentLoader';

export default function ServersPage() {
  const { data, error, loading } = useIsSwarmInitializedQuery();

  if (loading) {
    return <ContentLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.isSwarmInitialized) {
    return (
      <div className="wrapper">
        <InitSwarmContainer />
      </div>
    );
  }

  return (
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
  );
}
