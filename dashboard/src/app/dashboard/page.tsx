import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/layouts/PageHeader';
import { ProjectsList } from '@/components/projects/projects-list';

export default function DashboardIndex() {
  return (
    <DashboardLayout>
      <PageHeader title="Projects list" />
      <div className="wrapper">
        <div className="flex gap-4 flex-wrap">
          <ProjectsList />
        </div>
      </div>
    </DashboardLayout>
  );
}
