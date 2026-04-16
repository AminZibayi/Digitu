'use client';

import { useEffect, useMemo, useState } from 'react';
import { ApiRequestError, api } from '../lib/api';
import { resolvePersianErrorMessage } from '../lib/errorDictionary';

interface DashboardStats {
  productsUploaded: number;
  variantsCreated: number;
  lastRunAt: string | null;
}

const initialStats: DashboardStats = {
  productsUploaded: 0,
  variantsCreated: 0,
  lastRunAt: null,
};

export default function Dashboard() {
  const [statsData, setStatsData] = useState<DashboardStats>(initialStats);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.getStats()
      .then((stats) => {
        if (!cancelled) {
          setStatsData(stats);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          let message: string;
          if (error instanceof ApiRequestError) {
            message = resolvePersianErrorMessage(error.code, error.message);
          } else {
            message = error instanceof Error ? error.message : 'بارگذاری آمار ناموفق بود';
          }
          setStatsError(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: 'محصولات آپلودشده', value: String(statsData.productsUploaded), icon: '📦', color: '#ef394e' },
      { label: 'تنوع‌های ایجادشده', value: String(statsData.variantsCreated), icon: '🧩', color: '#7c5cbf' },
      { label: 'آخرین اجرا', value: statsData.lastRunAt ? new Date(statsData.lastRunAt).toLocaleString('fa-IR') : 'هرگز', icon: '🕒', color: '#22c55e' },
      { label: 'وضعیت پایگاه داده', value: statsError ? 'در دسترس نیست' : 'سالم', icon: '🗄️', color: '#3b82f6' },
    ],
    [statsData, statsError],
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">داشبورد</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          نمای کلی سیستم و میانبرهای عملیاتی مجموعه اتوماسیون.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xl">{s.icon}</span>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">{s.value}</div>
              <div className="text-xs text-[var(--foreground-muted)] mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
            <span>📤</span> آپلود محصولات
          </h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            آپلود گروهی محصولات از فایل CSV با نمایش پیشرفت لحظه‌ای در سطح هر ردیف.
          </p>
          <a href="/uploader" className="btn-primary w-full text-center">باز کردن آپلودر</a>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
            <span>🧩</span> ایجاد تنوع
          </h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            تولید خودکار تنوع‌های سایز و قیمت با پشتیبانی از اجرای آزمایشی و جلوگیری از ثبت تکراری.
          </p>
          <a href="/variants" className="btn-primary w-full text-center">باز کردن ابزار تنوع</a>
        </div>
      </div>

      {/* Connectivity status */}
      <div className="glass-card p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">🔗</span>
          <div>
            <div className="text-sm font-medium">رابط فروشنده دیجی‌کالا</div>
            <div className="text-xs text-[var(--foreground-muted)]">برای فعال شدن سرویس‌ها، کوکی سشن را تنظیم کنید</div>
          </div>
        </div>
        <span className="chip-warn">تنظیم نشده</span>
      </div>
    </div>
  );
}
