'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { authClient } from '@/lib/auth-client';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authClient.signIn.email({ email, password });
      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center text-xl font-medium">Authorization</div>
      <div className="text-center text-sm text-muted-foreground">
        Enter your details to login
      </div>
      <form onSubmit={handleSubmit} className="my-6 space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
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
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
