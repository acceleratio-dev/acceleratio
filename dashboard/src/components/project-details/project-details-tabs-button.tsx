import { useMemo } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const ProjectDetailsTabsButton = ({
  activeTab,
  projectId,
}: {
  activeTab: string;
  projectId: string;
}) => {
  const tabButton = useMemo(() => {
    switch (activeTab) {
      case 'services':
        return (
          <Link href={`/dashboard/projects/${projectId}/new-service`}>
            <Button>
              <Plus />
              New service
            </Button>
          </Link>
        );
      case 'deployments':
        return;
      case 'settings':
        return;
      default:
        return;
    }
  }, [activeTab, projectId]);

  return <div>{tabButton}</div>;
};
