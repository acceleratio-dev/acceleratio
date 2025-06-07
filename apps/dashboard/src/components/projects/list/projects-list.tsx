'use client';
import { useGetProjectsQuery } from '@/lib/graphql/generated';
import { CreateProjectDialog } from './create-dialog';
import { ProjectItem } from './project-item/project-item';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const ProjectsList = () => {
  const { data, loading } = useGetProjectsQuery({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex gap-4 flex-wrap">
      {loading ? (
        <>
          <Skeleton className="h-28 w-[340px] rounded-lg" />
          <Skeleton className="h-28 w-[340px] rounded-lg" />
        </>
      ) : (
        data?.projects.map((project) => (
          <ProjectItem key={project.id} data={project} />
        ))
      )}
      <CreateProjectDialog />
    </div>
  );
};
