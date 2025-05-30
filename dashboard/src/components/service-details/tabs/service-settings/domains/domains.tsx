import { ServiceSettingsTitle } from '../components/service-settings-title';
import { ServiceWithDeployment } from '../../service-deployments/_generated/getServiceDeploymentsQuery.generated';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AssignDomainDialog } from './assign-domain-dialog';

export const Domains = ({ service }: { service: ServiceWithDeployment }) => {
  const { draftDeployment, activeDeployment } = service;
  const deployment = draftDeployment || activeDeployment;

  const domains = deployment?.config.domains || [];

  return (
    <div className="w-[600px]">
      <ServiceSettingsTitle title="Domains">
        <AssignDomainDialog serviceId={service._id} />
      </ServiceSettingsTitle>
      {domains.length > 0 ? (
        <div className="space-y-2 mt-4">
          {domains.map((domain) => (
            <div
              className="flex items-center justify-between border rounded-md px-4 py-2 bg-slate-50"
              key={domain.domain}
            >
              <div>
                {domain.domain}
                {domain.path && `/${domain.path}`}
                {domain.port && `:${domain.port}`}
              </div>
              <div>{domain.status?.toLowerCase() || ''}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No domains</div>
      )}
    </div>
  );
};
