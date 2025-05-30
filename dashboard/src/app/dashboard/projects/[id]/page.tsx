import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ProjectDetailsContent } from '@/components/project-details/project-details-content';
import { client } from '@/lib/apolloClient';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layouts/PageHeader';
import { GetProjectByIdQueryDocument } from './_generated/getProjectByIdQuery.generated';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await client.query({
    query: GetProjectByIdQueryDocument,
    variables: { projectId: id },
    fetchPolicy: 'no-cache',
  });

  if (!data || error) {
    return notFound();
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={'Project ' + data.getProjectById.name}
        backLink="/dashboard"
      />
      <div className="wrapper h-full">
        <ProjectDetailsContent project={data.getProjectById} />
      </div>
    </DashboardLayout>
  );
}
