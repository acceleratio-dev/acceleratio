'use client';

import { PageHeader } from '@/components/layouts/PageHeader';
import {
  useGetServiceByIdQuery,
  ServiceWithDeployment,
} from './_generated/getServiceByIdQuery.generated';
import { ServiceDetailsContent } from '@/components/service-details/service-details-content';
import { use } from 'react';
import { toast } from 'sonner';

export default function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const { data, loading } = useGetServiceByIdQuery({
    variables: { id: unwrappedParams.id },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (loading) return <LoadingState />;
  if (!data?.service) return <div>Service not found</div>;

  const service = data.service;
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

const LoadingState = () => (
  <>
    <PageHeader title={`Service`} backLink={'/dashboard/projects'} />
    <div className="wrapper">
      <div>Loading...</div>
    </div>
  </>
);
