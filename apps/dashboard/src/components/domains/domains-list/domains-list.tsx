'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetDomainsQuery, useGetDomainsQuery } from '@/lib/graphql/generated';
import { FaLinkSlash } from 'react-icons/fa6';
import moment from 'moment';

export const DomainsList = () => {
  const { data, loading } = useGetDomainsQuery({
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Domains list</CardTitle>
        <CardDescription>You can assign domains to the services in their details page.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState />
        ) : data?.domains.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {data?.domains.map((domain) => (
              <DomainItem key={domain.id} domain={domain} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DomainItem = ({ domain }: { domain: GetDomainsQuery['domains'][number] }) => {
  return (
    <div className="flex items-center justify-between">
      <div>{domain.url}</div>
      <div className="text-xs text-slate-500 font-medium">{moment(domain.createdAt).format('DD/MM/YYYY')}</div>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse flex-1"></div>
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col text-slate-700 items-center justify-center h-36 bg-slate-50 border-2 rounded-md border-dashed">
      <FaLinkSlash size={42} />
      <div className="text-sm font-medium mt-2">Domains haven't been added yet</div>
    </div>
  );
};
