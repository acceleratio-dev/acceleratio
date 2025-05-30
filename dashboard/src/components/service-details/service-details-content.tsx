'use client';
import { ServiceWithDeployment } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';
import { useSearchParams } from 'next/navigation';
import { ServiceSettings } from './tabs/service-settings';
import { ServiceDetailsHeader } from './service-details-header';
import { ServiceOverview } from './tabs/service-overview';
import { ServiceDeployments } from './tabs/service-deployments';

export const ServiceDetailsContent = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ServiceOverview service={service} />;
      case 'deployments':
        return <ServiceDeployments serviceId={service._id} />;
      case 'settings':
        return <ServiceSettings service={service} />;
      default:
        return <div>Services content</div>;
    }
  };
  return (
    <>
      <ServiceDetailsHeader service={service} activeTab={activeTab} />

      <div className="mt-4 border rounded-md overflow-hidden">
        {renderTabContent()}
      </div>
    </>
  );
};
