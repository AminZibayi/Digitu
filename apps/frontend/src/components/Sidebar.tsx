'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { normalizeThemePreference } from '@/lib/theme';
import { BRANDING } from '@digikala/branding';
import Image from 'next/image';

const nav = [
  { href: '/', label: 'داشبورد', icon: '⬛' },
  { href: '/settings', label: 'تنظیمات', icon: '⚙️' },
  { href: '/uploader', label: 'آپلود محصولات', icon: '📤' },
  { href: '/variants', label: 'ایجاد تنوع', icon: '🧩' },
  { href: '/console', label: 'کنسول زنده', icon: '📋' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col py-6 px-4 border-l border-[var(--border)] bg-[var(--surface)]">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm relative"
            style={{ background: 'var(--accent)' }}>
            <Image 
              src={theme.resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} 
              alt="Logo" 
              fill
              className="p-1.5"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--foreground)]">{BRANDING.shortName}</div>
            <div className="text-[10px] text-[var(--foreground-muted)] tracking-widest">مجموعه اتوماسیون</div>
          </div>
        </div>
        <div className="accent-line mt-4" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-[var(--accent-glow)] text-white border border-[var(--accent)]/30'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]'
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-2 pt-4 border-t border-[var(--border)] space-y-3">
        <div>
          <label htmlFor="theme-select" className="text-xs text-[var(--foreground-muted)]">
            تم رابط کاربری
          </label>
          <select
            id="theme-select"
            value={theme.preference}
            onChange={(event) => theme.setPreference(normalizeThemePreference(event.target.value))}
            className="w-full mt-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg px-2.5 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
          >
            <option value="system">سیستم</option>
            <option value="light">روشن</option>
            <option value="dark">تیره</option>
          </select>
        </div>
        <p className="text-[10px] text-[var(--foreground-muted)] text-center">
          v1.0.0 · Electron + Next.js · {theme.resolvedTheme === 'dark' ? 'نمای تیره' : 'نمای روشن'}
        </p>
      </div>
    </aside>
  );
}
