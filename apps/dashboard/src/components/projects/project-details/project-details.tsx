import { ProjectContext } from '@/components/providers/project-provider';
import { EnhancedTabs } from '@/components/ui/enhanced-tabs';
import { useContext, useState } from 'react';
import { CreateServiceDialog } from './create-service-dialog';
import { ProjectServicesList } from './project-services-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export const ProjectDetails = () => {
  const { project } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="wrapper !mt-4">
      <Link href={`/dashboard`}>
        <Button className="mb-4" variant={'ghost'}>
          <IoArrowBack />
          Back to projects list
        </Button>
      </Link>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="text-lg font-medium">{project.name}</div>
          <div className="text-sm text-gray-500">{project.description || 'No description'}</div>
        </div>
        <div className="border-t px-6 py-1 bg-gray-50 rounded-b-lg flex justify-between">
          <EnhancedTabs
            tabs={['Services', 'Settings']}
            activeIndex={activeTab}
            onTabChange={setActiveTab}
            tabKey="project-tab"
          />
          <CreateServiceDialog />
        </div>
      </div>
      <ProjectServicesList />
    </div>
  );
};
