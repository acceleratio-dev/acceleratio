'use client';

import { Button } from '@/components/ui/button';
import { Settings, Skull } from 'lucide-react';
import { DangerZone } from './danger-zone';
import { useMemo, useState } from 'react';
import { GeneralInfo } from './general-info';

export const ProjectSettings = ({ projectId }: { projectId: string }) => {
  const tabs = useMemo(
    () => [
      {
        label: 'General info',
        icon: Settings,
        component: <GeneralInfo />,
      },
      {
        label: 'Danger zone',
        icon: Skull,
        component: <DangerZone projectId={projectId} />,
      },
    ],
    [projectId],
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex">
      <div className="p-4 bg-slate-50 border-r h-full w-[240px] space-y-2 min-h-[600px]">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            className="w-full flex justify-start leading-none"
            variant={'outline'}
            onClick={() => setActiveTab(tab)}
          >
            <tab.icon />
            {tab.label}
          </Button>
        ))}
      </div>
      <div className='p-4'>{activeTab.component}</div>
    </div>
  );
};
