'use client';

import { Button } from '@/components/ui/button';
import { Globe, Settings, Skull, Webhook } from 'lucide-react';
import { DangerZone } from './danger-zone';
import { useMemo, useState } from 'react';
import { GeneralInfo } from './general-info';
import { ServiceWithDeployment } from '../service-deployments/_generated/getServiceDeploymentsQuery.generated';
import { Domains } from './domains';

export const ServiceSettings = ({
  service,
}: {
  service: ServiceWithDeployment;
}) => {
  const tabs = [
    {
      label: 'General info',
      key: 'general-info',
      icon: Settings,
      component: <GeneralInfo service={service} />,
    },
    {
      label: 'Domains',
      key: 'domains',
      icon: Globe,
      component: <Domains service={service} />,
    },
    {
      label: 'Danger zone',
      key: 'danger-zone',
      icon: Skull,
      component: <DangerZone serviceId={service._id} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="flex">
      <div className="p-4 bg-slate-50 border-r h-full w-[240px] space-y-2 min-h-[600px]">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            className="w-full flex justify-start leading-none"
            variant={'outline'}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon />
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="p-4">
        {tabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
};
