'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { ServiceProvider } from '@/components/providers/service-provider';
import { ServiceDetails } from '@/components/services/service-details';
import { ServiceDetailsSkeleton } from '@/components/services/service-details/service-details-skeleton';
import { useGetServiceByIdQuery } from '@/lib/graphql/generated';
import { notFound, useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function ServicePage() {
  const params = useParams();
  const { data, loading, error } = useGetServiceByIdQuery({
    variables: {
      id: params.serviceId as string,
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (loading) return <DashboardLayout><ServiceDetailsSkeleton /></DashboardLayout>;

  if (error || !data?.service) return notFound();

  return (
    <DashboardLayout>
      <ServiceProvider service={data.service}>
        <ServiceDetails />
      </ServiceProvider>
    </DashboardLayout>
  );
}
