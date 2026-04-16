'use client';

import { useEffect, useState } from 'react';
import { ApiRequestError, api } from '../../lib/api';
import { resolvePersianErrorMessage } from '../../lib/errorDictionary';

export default function SettingsPage() {
  const [cookie, setCookie] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://seller.digikala.com/api/v2');
  const [referer, setReferer] = useState('https://seller.digikala.com/pwa/');
  const [timeoutMs, setTimeoutMs] = useState(20000);
  const [maxRetries, setMaxRetries] = useState(3);
  const [retryDelayMs, setRetryDelayMs] = useState(600);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.getSettings()
      .then((data) => {
        if (cancelled) return;
        if (data.baseUrl) setBaseUrl(data.baseUrl);
        if (data.referer) setReferer(data.referer);
        if (data.timeoutMs) setTimeoutMs(data.timeoutMs);
        if (data.maxRetries) setMaxRetries(data.maxRetries);
        if (data.retryDelayMs) setRetryDelayMs(data.retryDelayMs);
        if (data.configured) {
          setStatus('تنظیمات رمزنگاری‌شده قبلاً ثبت شده‌اند. برای امنیت، کوکی نمایش داده نمی‌شود.');
        }
      })
      .catch((error: unknown) => {
        const message = error instanceof ApiRequestError
          ? resolvePersianErrorMessage(error.code, error.message)
          : (error instanceof Error ? error.message : 'بارگذاری تنظیمات ناموفق بود');
        setStatus(`❌ ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const response = await api.saveSettings({
        cookie,
        baseUrl,
        referer,
        timeoutMs,
        maxRetries,
        retryDelayMs,
      });
      if (!response.success) {
        const rawError = response.error;
        if (rawError && typeof rawError === 'object') {
          const payload = rawError as { code?: string; message?: string };
          throw new ApiRequestError(payload.code ?? 'SETTINGS_SAVE_FAILED', payload.message ?? 'Failed to save settings');
        }
        throw new Error(typeof rawError === 'string' ? rawError : 'Failed to save settings');
      }
      setCookie('');
      setStatus('✅ تنظیمات با موفقیت در حافظه محلی رمزنگاری‌شده ذخیره شد.');
    } catch (error: unknown) {
      const message = error instanceof ApiRequestError
        ? resolvePersianErrorMessage(error.code, error.message)
        : (error instanceof Error ? error.message : 'ذخیره تنظیمات ناموفق بود');
      setStatus(`❌ ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          احراز هویت دیجی‌کالا و کنترل‌های پایداری API را تنظیم کنید.
        </p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <label className="text-sm font-medium text-[var(--foreground-muted)] block">کوکی</label>
        <textarea
          value={cookie}
          onChange={(e) => setCookie(e.target.value)}
          rows={4}
          placeholder="رشته کامل کوکی را وارد کنید (برای حفظ کوکی فعلی، خالی بگذارید)"
          className="w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-y"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[var(--foreground-muted)]">
            آدرس پایه
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="mt-1 w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="text-sm text-[var(--foreground-muted)]">
            رفرر
            <input
              type="text"
              value={referer}
              onChange={(e) => setReferer(e.target.value)}
              className="mt-1 w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="text-sm text-[var(--foreground-muted)]">
            مهلت پاسخ (ms)
            <input
              type="number"
              min={1}
              value={timeoutMs}
              onChange={(e) => setTimeoutMs(Number(e.target.value))}
              className="mt-1 w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="text-sm text-[var(--foreground-muted)]">
            حداکثر تلاش مجدد
            <input
              type="number"
              min={1}
              value={maxRetries}
              onChange={(e) => setMaxRetries(Number(e.target.value))}
              className="mt-1 w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="text-sm text-[var(--foreground-muted)] md:col-span-2">
            فاصله تلاش مجدد (ms)
            <input
              type="number"
              min={1}
              value={retryDelayMs}
              onChange={(e) => setRetryDelayMs(Number(e.target.value))}
              className="mt-1 w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[var(--foreground-muted)]">
            اطلاعات حساس پیش از ذخیره روی دیسک رمزنگاری می‌شوند.
          </span>
          <button className="btn-primary" onClick={handleSave} disabled={saving || loading}>
            {saving ? 'در حال ذخیره…' : 'ذخیره تنظیمات'}
          </button>
        </div>
      </div>

      {status && (
        <div className={`glass-card p-4 text-sm ${status.startsWith('✅') ? 'text-green-400' : status.startsWith('❌') ? 'text-red-400' : 'text-[var(--foreground-muted)]'}`}>
          {status}
        </div>
      )}
    </div>
  );
}
