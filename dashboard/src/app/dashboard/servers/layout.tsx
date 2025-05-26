import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/layouts/PageHeader';

export default function ServersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <PageHeader title="Servers" />
      {children}
    </DashboardLayout>
  );
}
