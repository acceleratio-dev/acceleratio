import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
