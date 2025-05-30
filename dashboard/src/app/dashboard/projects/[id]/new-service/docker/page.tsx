import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/layouts/PageHeader';
import { CreateDockerService } from '@/components/service/create-service/createDockerService';

export default async function DockerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <PageHeader
        title="Create docker service"
        backLink={`/dashboard/projects/${id}/new-service`}
      />
      <div className="wrapper">
        <CreateDockerService projectId={id} />
      </div>
    </DashboardLayout>
  );
}
