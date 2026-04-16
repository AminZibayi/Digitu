import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'دیجی‌کالا اتو',
  description: 'مجموعه یکپارچه آپلود محصول و ایجاد تنوع',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex h-screen overflow-hidden">
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 bg-[var(--background)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
