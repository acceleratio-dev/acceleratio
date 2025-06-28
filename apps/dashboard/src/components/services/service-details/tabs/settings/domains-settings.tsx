import { FaGlobe } from 'react-icons/fa6';
import { AssignDomainDialog } from './assign-domain-dialog';
import { useContext } from 'react';
import { ServiceContext } from '@/components/providers/service-provider';
import { useGetServiceDomainsQuery, useRemoveDomainFromServiceMutation } from '@/lib/graphql/generated';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const DomainsSettings = () => {
  const { service } = useContext(ServiceContext);
  const { data, loading } = useGetServiceDomainsQuery({
    variables: {
      serviceId: service?.id,
    },
  });

  const [removeDomainFromService, { loading: removeDomainFromServiceLoading }] = useRemoveDomainFromServiceMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Domain removed');
    },
    refetchQueries: ['GetServiceDomains'],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-medium">Domains</div>
          <div className="text-sm text-slate-600 mb-4">Expose service to the internet by assigning a domain.</div>
        </div>
        <div>{data?.domains.length && data?.domains.length > 0 ? <AssignDomainDialog /> : null}</div>
      </div>
      {data?.domains.length === 0 ? (
        <div className="bg-slate-100 border border-slate-300 border-dashed p-4 rounded-md h-[192px] flex flex-col gap-2 items-center justify-center">
          <FaGlobe size={32} className="fill-slate-600" />
          <div className="text-slate-600 text-sm font-medium">Domains haven't been assigned yet</div>
          <AssignDomainDialog />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.domains.map((domain) => (
            <div
              key={domain.domain + domain.path + domain.port}
              className="border flex items-center rounded-md p-2 bg-slate-50"
            >
              https://{domain.domain}
              {domain.path}:{domain.port}
              <Button
                className="flex ml-auto"
                onClick={() =>
                  removeDomainFromService({
                    variables: { serviceId: service?.id, url: domain.domain, path: domain.path },
                  })
                }
                disabled={removeDomainFromServiceLoading}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
