import { apolloClient } from '@/lib/apollo-client';
import { auth } from '@/lib/auth';
import {
  FirstUserCreatedDocument,
  FirstUserCreatedQuery,
} from '@/lib/graphql/generated';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let firstUserCreated = false;

  try {
    const { data } = await apolloClient.query<FirstUserCreatedQuery>({
      query: FirstUserCreatedDocument,
      fetchPolicy: 'no-cache',
    });
    firstUserCreated = data?.firstUserCreated ?? false;
  } catch (error) {
    console.error('Failed to fetch first user status:', error);
    firstUserCreated = true;
  }

  if (!firstUserCreated) {
    return redirect('/getting-started');
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-3 bg-slate-50">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            Acceleratio
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block col-span-2 quote">
        <div className="absolute inset-0 h-full w-full quote z-0" />
        <img
          src="/auth.jpg"
          alt="Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute z-10 left-0 right-0 bottom-0 px-6 py-4 text-white text-right space-y-1">
          <div>"Infrastructure management is easy with Acceleratio"</div>
          <div className="font-medium text-sm text-slate-300">Random dude</div>
        </div>
      </div>
    </div>
  );
}
