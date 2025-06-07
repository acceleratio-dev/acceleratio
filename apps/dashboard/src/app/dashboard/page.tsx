import { DashboardLayout } from '@/components/dashboard-layout';
import { PageHeader } from '@/components/dashboard-layout/page-header';
import { ProjectsList } from '@/components/projects/list';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Dashboard" />
      <div className="wrapper">
        <ProjectsList />
      </div>
    </DashboardLayout>
  );
}
