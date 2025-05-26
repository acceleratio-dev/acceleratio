import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/layouts/PageHeader';
import { CreateProject } from '@/components/projects/create-project';
import { ProjectsList } from '@/components/projects/projects-list';

export default function DashboardIndex() {
  return (
    <DashboardLayout>
      <PageHeader title="Projects list" />
      <div className="wrapper">
        <CreateProject />
        <div className="flex">
          <ProjectsList />
        </div>
      </div>
    </DashboardLayout>
  );
}
