'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetDomainsQuery, useGetDomainsQuery } from '@/lib/graphql/generated';
import { FaLinkSlash } from 'react-icons/fa6';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import moment from 'moment';
import { DomainStatus } from './domain-status';

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
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="w-1/3">Domain</TableHead>
                <TableHead className="w-1/3">Status</TableHead>
                <TableHead className="w-1/3">Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <LoadingState />
              ) : data?.domains.length && data?.domains.length > 0 ? (
                data?.domains.map((domain) => <DomainItem key={domain.id} domain={domain} />)
              ) : null}
            </TableBody>
          </Table>
           {
            data?.domains.length && data?.domains.length === 0 ? <EmptyState /> : null
           }
        </div>
      </CardContent>
    </Card>
  );
};

const DomainItem = ({ domain }: { domain: GetDomainsQuery['domains'][number] }) => {
  return (
    <TableRow className='h-10'>
      <TableCell className="font-medium">{domain.url}</TableCell>
      <TableCell>
        <DomainStatus status={domain.status} />
      </TableCell>
      <TableCell className="text-xs text-slate-500 font-medium">
        {moment(domain.createdAt).format('DD/MM/YYYY')}
      </TableCell>
    </TableRow>
  );
};

const LoadingState = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <TableRow className="h-10" key={i}>
          <TableCell className="bg-slate-100 animate-pulse"></TableCell>
          <TableCell className="bg-slate-100 animate-pulse flex-1"></TableCell>
          <TableCell className="bg-slate-100 animate-pulse"></TableCell>
        </TableRow>
      ))}
    </>
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
