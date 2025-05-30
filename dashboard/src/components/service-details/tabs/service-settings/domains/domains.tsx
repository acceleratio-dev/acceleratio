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
        <AssignDomainDialog />
      </ServiceSettingsTitle>
      {domains.length > 0 ? (
        <div>
          {domains.map((domain) => (
            <div key={domain.domain}>{domain.domain}</div>
          ))}
        </div>
      ) : (
        <div>No domains</div>
      )}
    </div>
  );
};
