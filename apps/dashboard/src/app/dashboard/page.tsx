import { DashboardLayout } from '@/components/dashboard-layout';
import { ProjectsList } from '@/components/projects/projects-list';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="wrapper">
        <ProjectsList />
      </div>
    </DashboardLayout>
  );
}
