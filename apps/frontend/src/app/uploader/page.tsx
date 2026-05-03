'use client';

import { useState, useCallback, useEffect } from 'react';
import type { IpcProgressEvent } from '../globals.d';
import { ApiRequestError, api } from '../../lib/api';
import { resolvePersianErrorMessage } from '../../lib/errorDictionary';

interface RowStatus {
  index: number;
  title: string;
  status: string;
  error?: string;
}

const STATUS_LABELS: Record<string, string> = {
  success: 'موفق',
  'success (dry-run)': 'موفق (آزمایشی)',
  failed: 'ناموفق',
  processing: 'در حال پردازش',
};

export default function UploaderPage() {
  const [csvFile, setCsvFile]         = useState<File | null>(null);
  const [parsedProducts, setParsedProducts] = useState<any[]>([]);
  
  const [autoPublish, setAutoPublish] = useState(false);
  const [dryRun, setDryRun]           = useState(false);
  const [running, setRunning]         = useState(false);
  const [rows, setRows]               = useState<RowStatus[]>([]);
  const [result, setResult]           = useState<string | null>(null);
  const [inputError, setInputError]   = useState<string | null>(null);

  const chipClass = (status: string) => {
    if (status === 'success' || status === 'success (dry-run)') return 'chip-success';
    if (status === 'failed')  return 'chip-error';
    if (status === 'processing') return 'chip-info';
    return 'chip-muted';
  };

  useEffect(() => {
    const unsubscribe = api.onUploadProgress((data: IpcProgressEvent) => {
      setRows((prev) => {
        const existing = prev.findIndex((r) => r.index === data.index);
        const entry: RowStatus = { index: data.index, title: data.title, status: data.status, error: data.error };
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

  const handleParse = async (file: File) => {
    try {
      const res = await api.parseUpload(file);
      if (res.success && Array.isArray(res.products)) {
        setParsedProducts(res.products);
      } else {
        setInputError('ساختار فایل CSV نامعتبر است.');
        setParsedProducts([]);
      }
    } catch (e) {
      setInputError('خطا در پردازش فایل CSV');
      setParsedProducts([]);
    }
  };

  const handleBrowse = useCallback(async () => {
    const file = await api.pickCsvFile();
    if (file) {
      setCsvFile(file);
      setInputError(null);
      setResult(null);
      await handleParse(file);
    }
  }, []);

  const updateProductRow = (index: number, field: string, value: string) => {
    const newProducts = [...parsedProducts];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setParsedProducts(newProducts);
  };

  const removeProductRow = (index: number) => {
    setParsedProducts(parsedProducts.filter((_, i) => i !== index));
  };

  const addProductRow = () => {
    setParsedProducts([...parsedProducts, { 
      'Product ID': '', 
      'Title': '', 
      'Category': '', 
      'Brand': '',
      'Price': '' 
    }]);
  };

  const handleRun = useCallback(async () => {
    if (parsedProducts.length === 0) {
      setInputError('هیچ محصولی برای آپلود وجود ندارد.');
      return;
    }
    setInputError(null);
    setRunning(true);
    setRows([]);
    setResult(null);
    try {
      const res = await api.runUpload('', autoPublish, dryRun, undefined, parsedProducts);
      setResult(res.success
        ? `✅ تکمیل شد: ${res.results?.filter((r: any) => r.status === 'success' || r.status === 'success (dry-run)').length ?? 0} مورد موفق.`
        : `❌ خطا: ${typeof res.error === 'string' ? res.error : res.error?.message ?? 'Upload failed'}`);
    } catch (error: unknown) {
      const message = error instanceof ApiRequestError
        ? resolvePersianErrorMessage(error.code, error.message)
        : (error instanceof Error ? error.message : 'آپلود ناموفق بود');
      setResult(`❌ خطا: ${message}`);
    } finally {
      setRunning(false);
    }
  }, [parsedProducts, autoPublish, dryRun]);

  const total   = rows.length;
  const done    = rows.filter(r => r.status.startsWith('success') || r.status === 'failed').length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  // Derive column headers dynamically based on first product keys or fallback
  const columns = parsedProducts.length > 0 
    ? Object.keys(parsedProducts[0]).filter(k => k !== '_error' && k !== '_raw') 
    : ['Product ID', 'Title', 'Category', 'Brand', 'Price'];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold">آپلود محصولات</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          محصولات را از فایل CSV بارگیری کرده، ویرایش کنید و برای آپلود به سرور ارسال نمایید.
        </p>
      </div>

      {/* Input */}
      <div className="glass-card p-5 space-y-4">
        <label className="text-sm font-medium text-[var(--foreground-muted)]">انتخاب فایل CSV</label>
        <div className="flex gap-3">
          <input
            type="text"
            readOnly
            value={csvFile ? csvFile.name : ''}
            placeholder="ابتدا فایل را انتخاب کنید..."
            className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground-muted)] outline-none"
          />
          <button
            type="button"
            onClick={handleBrowse}
            className="btn-ghost"
          >
            انتخاب فایل
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="auto-publish"
            checked={autoPublish}
            onChange={(e) => setAutoPublish(e.target.checked)}
            className="w-5 h-5 rounded border-[var(--border)] bg-[var(--surface-alt)] cursor-pointer"
          />
          <label htmlFor="auto-publish" className="text-sm text-[var(--foreground)] cursor-pointer">
            انتشار خودکار پس از ایجاد پیش‌نویس
          </label>
        </div>
        {inputError && <p className="text-xs text-red-400">{inputError}</p>}
      </div>

      {/* Editable Table */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--border)] pb-2 mb-4">
          <h2 className="text-lg font-bold">پیش‌نمایش و ویرایش ({parsedProducts.length})</h2>
          <button onClick={addProductRow} className="text-sm text-[var(--accent)] hover:underline">+ افزودن ردیف دستی</button>
        </div>

        {parsedProducts.length > 0 ? (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-right whitespace-nowrap">
              <thead className="sticky top-0 bg-[var(--surface)] shadow-sm">
                <tr className="text-[var(--foreground-muted)] uppercase tracking-wider">
                  {columns.map(col => (
                    <th key={col} className="px-4 py-3 font-medium min-w-[150px]">{col}</th>
                  ))}
                  <th className="px-4 py-3 font-medium w-16">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {parsedProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                    {columns.map(col => (
                      <td key={col} className="px-4 py-2">
                        <input 
                          type="text" 
                          value={p[col] || ''} 
                          onChange={e => updateProductRow(i, col, e.target.value)}
                          className="w-full bg-transparent border-b border-transparent focus:border-[var(--accent)] outline-none px-2 py-1"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => removeProductRow(i)} className="text-red-400 hover:text-red-500" title="حذف ردیف">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-[var(--foreground-muted)] py-8">
            فایلی انتخاب نشده است یا فایل خالی است.
          </p>
        )}
      </div>

      {/* Execution Panel */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4">
          <button
            id="run-upload-btn"
            onClick={handleRun}
            disabled={running || parsedProducts.length === 0}
            className="btn-primary flex-1 py-3 text-base justify-center"
          >
            {running ? 'در حال اجرا…' : 'شروع آپلود محصولات'}
          </button>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="dry-run"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              className="w-5 h-5 rounded border-[var(--border)] bg-[var(--surface-alt)] cursor-pointer"
            />
            <label htmlFor="dry-run" className="text-sm font-medium text-[var(--foreground)] cursor-pointer">
              اجرای آزمایشی (Dry Run)
            </label>
          </div>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="space-y-3 pt-2">
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
          <div className={`p-4 text-sm font-medium rounded-xl border ${result.startsWith('✅') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {result}
          </div>
        )}

        {/* Result Table */}
        {rows.length > 0 && (
          <div className="overflow-x-auto border border-[var(--border)] rounded-xl mt-4">
            <table className="w-full text-sm">
              <thead className="bg-[var(--surface-alt)]">
                <tr className="text-right text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">محصول</th>
                  <th className="px-4 py-3">وضعیت</th>
                  <th className="px-4 py-3">خطا / جزئیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {rows.map((row) => (
                  <tr key={row.index} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{row.index + 1}</td>
                    <td className="px-4 py-3 text-[var(--foreground)] font-medium">{row.title}</td>
                    <td className="px-4 py-3">
                      <span className={chipClass(row.status)}>{STATUS_LABELS[row.status] ?? row.status}</span>
                    </td>
                    <td className="px-4 py-3 text-red-400 text-xs max-w-xs truncate" title={row.error || ''}>{row.error || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
