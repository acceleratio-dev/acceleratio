'use client';

import { PageHeader } from '@/components/layouts/PageHeader';
import {
  ServiceWithDeployment,
  useGetServiceByIdQuery,
} from './_generated/getServiceByIdQuery.generated';
import { ServiceDetailsContent } from '@/components/service-details/service-details-content';
import { use } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

type PageParams = {
  id: string;
};

export default function ServicePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = use(params);
  const { data, loading, error } = useGetServiceByIdQuery({
    variables: { id: resolvedParams.id },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const service = data?.service;

  if (loading || !data || error) return <ServiceLoadingSkeleton />;

  return (
    <>
      <PageHeader
        title={`Service ${service?.name}`}
        backLink={`/dashboard/projects/${service?.projectId}`}
      />
      <div className="wrapper">
        <ServiceDetailsContent service={service as ServiceWithDeployment} />
      </div>
    </>
  );
}

const ServiceLoadingSkeleton = () => {
  return (
    <>
      <PageHeader title="Service" backLink="#" />
      <div className="wrapper">
        <div>
          <div className="border rounded-md">
            <div className="px-4 py-6 flex items-center gap-4">
              <Skeleton className="w-9 h-9" />
              <Skeleton className="h-6 w-32" />
              <div className="ml-auto">
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
            <div className="px-4 pt-1 border-t flex justify-between items-center bg-slate-50 rounded-b-md">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 border rounded-md overflow-hidden">
            <div className="flex justify-between">
              <div className="flex-1 p-4">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="border-l h-full w-[300px]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 border-b">
                    <Skeleton className="h-4 w-16 mb-4" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center text-sm">
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/2 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
