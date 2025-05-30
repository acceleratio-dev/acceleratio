import { cn } from '@/lib/utils';
import { History, Server, Settings } from 'lucide-react';
import Link from 'next/link';

const tabs = [
  {
    key: 'overview',
    label: 'Overview',
    icon: Server,
  },
  {
    key: 'deployments',
    label: 'Deployments history',
    icon: History,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

export const ServiceDetailsTabs = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <Link
          href={`?tab=${tab.key}`}
          className={cn(
            'flex items-center gap-2.5 py-3 px-4 text-sm font-medium border-b-2 hover:border-primary transition-all',
            activeTab === tab.key
              ? 'border-primary text-primary'
              : 'border-transparent',
          )}
          key={tab.key}
        >
          <tab.icon
            size={14}
            className={cn(
              'stroke-slate-700',
              activeTab === tab.key && 'stroke-primary',
            )}
          />
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
