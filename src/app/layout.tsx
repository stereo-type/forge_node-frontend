import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { DevPanel } from '@/components/dev-panel';

export const metadata: Metadata = {
  title: 'Forge Node',
  description: 'Workflow automation platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="ru">
      <body className="antialiased">
        <Providers>
          {isDev && <DevPanel />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
