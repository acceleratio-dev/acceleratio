import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
import { ServiceContext } from '@/components/providers/service-provider';
import { EnhancedTabs } from '@/components/ui/enhanced-tabs';
import { Overview } from './tabs/overview';
import { Settings } from './tabs/settings';
import { Deployments } from './tabs/deployments';
import { ServiceActions } from '../service-actions';
import { PodsLogs } from './pods-logs';
import { PodsProvider } from './pods-logs/pods-provider';
import { EnvironmentVariableScope, ServiceDeploymentStatus } from '@/lib/graphql/generated';
import { UpdateHint } from './update-hint';
import { Environment } from './tabs/environment';
import { CreateEnvironmentDialog } from './create-environment-dialog';

export const ServiceDetails = () => {
  const params = useParams();
  const { service, deployments } = useContext(ServiceContext);
  const [activeTab, setActiveTab] = useState(0);

  const haveUpdates = useMemo(() => {
    return deployments.length > 0 && deployments[0].status === ServiceDeploymentStatus.Draft;
  }, [deployments]);

  return (
    <div className="wrapper !mt-4 mb-20">
      <Link href={`/dashboard/project/${params.projectId}`}>
        <Button variant="ghost" className="mb-4">
          <IoArrowBack />
          Back to project
        </Button>
      </Link>
      <div className={`bg-white ${haveUpdates ? 'rounded-t-lg' : 'rounded-lg'} border`}>
        <div className="p-6 flex">
          <div className="text-lg font-medium">{service.name}</div>
          <div className="ml-auto">
            <ServiceActions serviceId={service.id} />
          </div>
        </div>
        <div className="border-t px-6 h-10 bg-gray-50 rounded-b-lg flex items-center justify-between">
          <EnhancedTabs
            tabs={['Overview', 'Environment Variables', 'Deployments', 'Settings']}
            activeIndex={activeTab}
            onTabChange={setActiveTab}
            tabKey="service-tab"
          />
          {activeTab === 1 && (
            <CreateEnvironmentDialog scope={EnvironmentVariableScope.Service} serviceId={service.id} />
          )}
        </div>
      </div>
      {haveUpdates && <UpdateHint />}
      {deployments.length === 0 ? (
        <Settings />
      ) : (
        <PodsProvider>
          {activeTab === 0 && <Overview />}
          {activeTab === 1 && <Environment />}
          {activeTab === 2 && <Deployments />}
          {activeTab === 3 && <Settings />}
          <PodsLogs />
        </PodsProvider>
      )}
    </div>
  );
};
