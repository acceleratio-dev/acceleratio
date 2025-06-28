'use client';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ProjectDetails } from '@/components/projects/project-details';
import { ProjectProvider } from '@/components/providers/project-provider';
import { useGetProjectByIdQuery } from '@/lib/graphql/generated';
import { notFound, useParams } from 'next/navigation';

export default function ProjectPage() {
  const params = useParams();
  const { data, loading, error } = useGetProjectByIdQuery({
    variables: {
      id: params.projectId as string,
    },
  });

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  if (error || !data?.project) return notFound();

  return (
    <DashboardLayout>
      <ProjectProvider project={data.project}>
        <ProjectDetails />
      </ProjectProvider>
    </DashboardLayout>
  );
}
