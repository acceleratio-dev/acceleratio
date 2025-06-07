'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createAdminUser } from './actions';

export default function GettingStartedPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createAdminUser(formData);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-3 bg-slate-50">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">Acceleratio</div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="text-center text-xl font-medium">
              Create Admin Account
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Set up your admin account to get started
            </div>
            <form onSubmit={handleSubmit} className="my-6 space-y-4">
              <FormInput
                label="Nickname"
                name="name"
                placeholder="John Doe"
                icon={<User />}
                required
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                icon={<Mail />}
                required
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                icon={<Lock />}
                required
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Admin Account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block col-span-2">
        <div className="absolute inset-0 h-full w-full quote z-0" />
        <img
          src="/auth.jpg"
          alt="Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
