import { DashboardLayout } from '@/components/dashboard-layout';
import { PageHeader } from '@/components/dashboard-layout/page-header';
import { CreateServiceDialog } from '@/components/services/create-dialog';
import { ServicesList } from '@/components/services/list';
import { apolloClient } from '@/lib/apollo-client';
import { GetProjectByIdDocument } from '@/lib/graphql/generated';
import { notFound } from 'next/navigation';

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: { project },
  } = await apolloClient.query({
    query: GetProjectByIdDocument,
    variables: {
      id: params.id,
    },
    fetchPolicy: 'no-cache',
  });

  if (!project) {
    return notFound();
  }

  return (
    <DashboardLayout>
      <PageHeader title={`Project ${project.name}`} backLink="/dashboard" />
      <div className="wrapper">
        <div className="bg-white border rounded-md p-4">
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <CreateServiceDialog projectId={project.id} />
        <ServicesList projectId={project.id} />
      </div>
    </DashboardLayout>
  );
}
