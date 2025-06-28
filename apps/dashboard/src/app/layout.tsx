import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ApolloProvider } from '@/components/providers/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { PublicEnvScript } from 'next-runtime-env';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Acceleratio',
  description: 'Acceleratio - PaaS for your projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased light`}>
        <PublicEnvScript />
        <ApolloProvider>
          {children}
          <Toaster position="bottom-right" theme="light" richColors={true} />
        </ApolloProvider>
      </body>
    </html>
  );
}
