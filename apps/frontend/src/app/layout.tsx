import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ClientErrorBoundary } from '@/components/ClientErrorBoundary';
import { BRANDING } from '@digikala/branding';

export const metadata: Metadata = {
  title: BRANDING.displayName,
  description: BRANDING.description,
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex h-screen overflow-hidden">
        <ClientErrorBoundary>
          <ThemeProvider>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 bg-[var(--background)]">
              {children}
            </main>
          </ThemeProvider>
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
