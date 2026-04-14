'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/',          label: 'Dashboard',       icon: '⬛' },
  { href: '/settings',  label: 'Settings',        icon: '⚙️' },
  { href: '/uploader',  label: 'Product Uploader', icon: '📤' },
  { href: '/variants',  label: 'Variant Creator',  icon: '🧩' },
  { href: '/console',   label: 'Live Console',     icon: '📋' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col py-6 px-4 border-r border-[var(--border)] bg-[var(--surface)]">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'var(--accent)' }}>
            D
          </div>
          <div>
            <div className="font-semibold text-sm text-[var(--foreground)]">Digikala Auto</div>
            <div className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-widest">Automation Suite</div>
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
      <div className="mt-auto px-2 pt-4 border-t border-[var(--border)]">
        <p className="text-[10px] text-[var(--foreground-muted)] text-center">v1.0.0 · Electron + Next.js</p>
      </div>
    </aside>
  );
}
