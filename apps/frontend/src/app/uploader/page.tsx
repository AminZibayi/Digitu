'use client';

import { useState, useCallback, useEffect } from 'react';
import type { IpcProgressEvent } from '../globals.d';
import { ApiRequestError, api } from '../../lib/api';
import { resolvePersianErrorMessage } from '../../lib/errorDictionary';

interface RowStatus {
  index: number;
  title: string;
  status: string;
}

const STATUS_LABELS: Record<string, string> = {
  success: 'موفق',
  failed: 'ناموفق',
  processing: 'در حال پردازش',
};

export default function UploaderPage() {
  const [csvPath, setCsvPath]         = useState('');
  const [csvFile, setCsvFile]         = useState<File | null>(null);
  const [autoPublish, setAutoPublish] = useState(false);
  const [running, setRunning]         = useState(false);
  const [rows, setRows]               = useState<RowStatus[]>([]);
  const [result, setResult]           = useState<string | null>(null);
  const [inputError, setInputError]   = useState<string | null>(null);

  const chipClass = (status: string) => {
    if (status === 'success') return 'chip-success';
    if (status === 'failed')  return 'chip-error';
    if (status === 'processing') return 'chip-info';
    return 'chip-muted';
  };

  useEffect(() => {
    const unsubscribe = api.onUploadProgress((data: IpcProgressEvent) => {
      setRows((prev) => {
        const existing = prev.findIndex((r) => r.index === data.index);
        const entry: RowStatus = { index: data.index, title: data.title, status: data.status };
        if (existing >= 0) {
          const next = [...prev];
          next[existing] = entry;
          return next;
        }
        return [...prev, entry];
      });
    });
    return () => unsubscribe?.();
  }, []);

  const handleRun = useCallback(async () => {
    if (!csvPath.trim() && !csvFile) {
      setInputError('مسیر فایل CSV را وارد کنید.');
      return;
    }
    setInputError(null);
    setRunning(true);
    setRows([]);
    setResult(null);
    try {
      const res = await api.runUpload(csvPath, autoPublish, csvFile ?? undefined);
      setResult(res.success
        ? `✅ تکمیل شد: ${res.results?.filter((r: any) => r.status === 'success').length ?? 0} مورد موفق.`
        : `❌ خطا: ${typeof res.error === 'string' ? res.error : res.error?.message ?? 'Upload failed'}`);
    } catch (error: unknown) {
      const message = error instanceof ApiRequestError
        ? resolvePersianErrorMessage(error.code, error.message)
        : (error instanceof Error ? error.message : 'آپلود ناموفق بود');
      setResult(`❌ خطا: ${message}`);
    } finally {
      setRunning(false);
    }
  }, [csvPath, autoPublish, csvFile]);

  const handleBrowse = useCallback(async () => {
    const file = await api.pickCsvFile();
    if (file) {
      setCsvFile(file);
      setCsvPath(URL.createObjectURL(file));
      setInputError(null);
    }
  }, []);

  const total   = rows.length;
  const done    = rows.filter(r => r.status === 'success' || r.status === 'failed').length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">آپلود محصولات</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          محصولات را به‌صورت گروهی از فایل CSV آپلود کنید و پیشرفت را لحظه‌ای ببینید.
        </p>
      </div>

      {/* Input */}
      <div className="glass-card p-5 space-y-4">
        <label className="text-sm font-medium text-[var(--foreground-muted)]">مسیر فایل CSV</label>
        <div className="flex gap-3">
          <input
            id="csv-path"
            type="text"
            value={csvPath}
            onChange={(e) => setCsvPath(e.target.value)}
            placeholder="C:\Users\...\products.csv"
            className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="button"
            onClick={handleBrowse}
            className="btn-ghost"
          >
            انتخاب فایل
          </button>
          <button
            id="run-upload-btn"
            onClick={handleRun}
            disabled={running || (!csvPath.trim() && !csvFile)}
            className="btn-primary"
          >
            {running ? 'در حال اجرا…' : 'شروع آپلود'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="auto-publish"
            checked={autoPublish}
            onChange={(e) => setAutoPublish(e.target.checked)}
            className="rounded border-[var(--border)] bg-[var(--surface-alt)]"
          />
          <label htmlFor="auto-publish" className="text-sm text-[var(--foreground)] cursor-pointer">
            انتشار خودکار پس از ایجاد پیش‌نویس
          </label>
        </div>
        {inputError && <p className="text-xs text-red-400">{inputError}</p>}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="glass-card p-5 space-y-3">
          <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
            <span>{done} / {total} ردیف پردازش شد</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--surface-alt)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%`, background: 'var(--accent)' }}
            />
          </div>
        </div>
      )}

      {/* Result banner */}
      {result && (
        <div className={`glass-card p-4 text-sm font-medium ${result.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {result}
        </div>
      )}

      {/* Row table */}
      {rows.length > 0 && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border)]">
              <tr className="text-right text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">محصول</th>
                <th className="px-4 py-3">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((row) => (
                <tr key={row.index} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                  <td className="px-4 py-3 text-[var(--foreground-muted)]">{row.index + 1}</td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{row.title}</td>
                  <td className="px-4 py-3">
                    <span className={chipClass(row.status)}>{STATUS_LABELS[row.status] ?? row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
