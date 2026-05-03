'use client';

import { useState, useCallback, useEffect } from 'react';
import type { IpcProgressEvent } from '../globals.d';
import { ApiRequestError, api, fetchFixtures, getFixture, uploadCSVFixture } from '../../lib/api';
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
  'skipped (duplicate)': 'پرش (تکراری)',
  failed: 'ناموفق',
  processing: 'در حال پردازش',
};

interface ProductRow {
  productId: number;
  productTitle: string;
}

interface SizeConfig {
  key: string;
  themeValueId: number;
  price: number;
  warrantyId?: string;
  active: boolean;
}

export default function VariantsPage() {
  // Data State
  const [fixtures, setFixtures] = useState<string[]>([]);
  const [selectedFixture, setSelectedFixture] = useState('');
  const [products, setProducts] = useState<ProductRow[]>([]);
  
  const [config, setConfig] = useState({
    themeId: 1,
    site: 'digikala',
    sizes: [{ key: 'پیش‌فرض', themeValueId: 1, price: 100000, warrantyId: '', active: true }] as SizeConfig[]
  });

  // UI State
  const [file, setFile] = useState<File | null>(null);
  const [newName, setNewName] = useState('');
  const [dryRun, setDryRun] = useState(false);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState<RowStatus[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const load = () => fetchFixtures().then(d => setFixtures(d.fixtures || [])).catch(() => setFixtures([]));
  useEffect(() => { load(); }, []);

  useEffect(() => {
    const unsubscribe = api.onVariantProgress((data: IpcProgressEvent) => {
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

  const handleSelectFixture = async (name: string) => {
    setSelectedFixture(name);
    setResult(null);
    if (!name) {
      setProducts([]);
      return;
    }
    try {
      const data = await getFixture(name);
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products.map((p: any) => ({
          productId: Number(p.productId) || 0,
          productTitle: String(p.productTitle || '')
        })));
      }
    } catch (e) {
      setResult('❌ خطا در بارگذاری فیکسچر');
    }
  };

  const handleUpload = async () => {
    if (!file || !newName) return;
    try {
      const text = await file.text();
      await uploadCSVFixture(newName, text);
      setNewName('');
      setFile(null);
      await load();
      handleSelectFixture(newName);
    } catch (e) {
      setResult('❌ خطا در آپلود فایل CSV');
    }
  };

  const handleRun = async () => {
    if (products.length === 0) return;
    setRunning(true);
    setRows([]);
    setResult(null);
    try {
      const sizesToSubmit = config.sizes.map(s => ({
        ...s,
        warrantyId: s.warrantyId ? Number(s.warrantyId) : undefined
      }));
      
      const res = await api.runVariantCreation(products, { ...config, sizes: sizesToSubmit }, dryRun);
      
      setResult(res.success
        ? `✅ پردازش پایان یافت.`
        : `❌ خطا: ${typeof res.error === 'string' ? res.error : res.error?.message ?? 'Creation failed'}`);
    } catch (error: unknown) {
      const message = error instanceof ApiRequestError
        ? resolvePersianErrorMessage(error.code, error.message)
        : (error instanceof Error ? error.message : 'عملیات ناموفق بود');
      setResult(`❌ خطا: ${message}`);
    } finally {
      setRunning(false);
    }
  };

  // Product Table Handlers
  const addProductRow = () => setProducts([...products, { productId: 0, productTitle: '' }]);
  const removeProductRow = (index: number) => setProducts(products.filter((_, i) => i !== index));
  const updateProductRow = (index: number, field: keyof ProductRow, value: string | number) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  // Config Handlers
  const addSize = () => setConfig({
    ...config, 
    sizes: [...config.sizes, { key: '', themeValueId: 1, price: 100000, warrantyId: '', active: true }]
  });
  const removeSize = (index: number) => setConfig({
    ...config,
    sizes: config.sizes.filter((_, i) => i !== index)
  });
  const updateSize = (index: number, field: keyof SizeConfig, value: any) => {
    const newSizes = [...config.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setConfig({ ...config, sizes: newSizes });
  };

  const chipClass = (status: string) => {
    if (status === 'success' || status === 'success (dry-run)') return 'chip-success';
    if (status === 'failed')  return 'chip-error';
    if (status === 'processing') return 'chip-info';
    return 'chip-muted';
  };

  const total = rows.length;
  const done = rows.filter(r => r.status.startsWith('success') || r.status === 'failed' || r.status.startsWith('skipped')).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold">ایجاد تنوع‌ها</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          محصولات را از فیکسچر بارگیری کنید، مقادیر را ویرایش کنید و تنوع‌ها را بسازید.
        </p>
      </div>

      {/* Load or Upload Data */}
      <div className="glass-card p-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-[var(--foreground-muted)]">انتخاب فیکسچر موجود</label>
            <div className="flex gap-3">
              <select 
                className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
                value={selectedFixture} 
                onChange={e => handleSelectFixture(e.target.value)}
              >
                <option value="">-- انتخاب --</option>
                {fixtures.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <button className="btn-ghost" onClick={load}>بروزرسانی</button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-[var(--foreground-muted)]">آپلود CSV جدید</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="نام فیکسچر (انگلیسی بدون فاصله)" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors" 
                />
                <button className="btn-ghost" onClick={handleUpload} disabled={!file || !newName}>آپلود</button>
              </div>
              <input 
                type="file" 
                accept=".csv" 
                onChange={e => setFile(e.target.files?.[0] || null)} 
                className="text-sm text-[var(--foreground-muted)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Config Editor */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="text-lg font-bold border-b border-[var(--border)] pb-2 mb-4">تنظیمات ایجاد تنوع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1">شناسه ویژگی (Theme ID)</label>
            <input 
              type="number" 
              value={config.themeId} 
              onChange={e => setConfig({...config, themeId: Number(e.target.value)})}
              className="w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1">سایت (Site)</label>
            <input 
              type="text" 
              value={config.site} 
              onChange={e => setConfig({...config, site: e.target.value})}
              className="w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-[var(--foreground-muted)]">لیست تنوع‌ها (Sizes)</label>
            <button onClick={addSize} className="text-xs text-[var(--accent)] hover:underline">+ افزودن سایز</button>
          </div>
          <div className="space-y-3">
            {config.sizes.map((size, index) => (
              <div key={index} className="flex gap-2 items-center bg-[var(--surface-alt)] p-3 rounded-xl border border-[var(--border)]">
                <input 
                  type="text" placeholder="عنوان (Key)" value={size.key} 
                  onChange={e => updateSize(index, 'key', e.target.value)}
                  className="w-1/5 bg-transparent border-b border-[var(--border)] px-2 py-1 text-sm outline-none focus:border-[var(--accent)]"
                />
                <input 
                  type="number" placeholder="مقدار ویژگی (Theme Value ID)" value={size.themeValueId} 
                  onChange={e => updateSize(index, 'themeValueId', Number(e.target.value))}
                  className="w-1/5 bg-transparent border-b border-[var(--border)] px-2 py-1 text-sm outline-none focus:border-[var(--accent)]"
                />
                <input 
                  type="number" placeholder="قیمت (Price)" value={size.price} 
                  onChange={e => updateSize(index, 'price', Number(e.target.value))}
                  className="w-1/5 bg-transparent border-b border-[var(--border)] px-2 py-1 text-sm outline-none focus:border-[var(--accent)]"
                />
                <input 
                  type="number" placeholder="گارانتی (اختیاری)" value={size.warrantyId} 
                  onChange={e => updateSize(index, 'warrantyId', e.target.value)}
                  className="w-1/5 bg-transparent border-b border-[var(--border)] px-2 py-1 text-sm outline-none focus:border-[var(--accent)]"
                />
                <div className="flex items-center gap-1 w-1/5 justify-end">
                  <input 
                    type="checkbox" checked={size.active} 
                    onChange={e => updateSize(index, 'active', e.target.checked)}
                  />
                  <span className="text-xs text-[var(--foreground-muted)]">فعال</span>
                  <button onClick={() => removeSize(index)} className="text-red-400 hover:text-red-500 mr-2" title="حذف">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editable Products Table */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--border)] pb-2 mb-4">
          <h2 className="text-lg font-bold">محصولات ({products.length})</h2>
          <button onClick={addProductRow} className="text-sm text-[var(--accent)] hover:underline">+ افزودن محصول جدید</button>
        </div>
        
        {products.length > 0 ? (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-right">
              <thead className="sticky top-0 bg-[var(--surface)] shadow-sm">
                <tr className="text-[var(--foreground-muted)] uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">شناسه محصول (DKP)</th>
                  <th className="px-4 py-3 font-medium">عنوان محصول</th>
                  <th className="px-4 py-3 font-medium w-16">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {products.map((p, i) => (
                  <tr key={i} className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                    <td className="px-4 py-2">
                      <input 
                        type="number" 
                        value={p.productId || ''} 
                        onChange={e => updateProductRow(i, 'productId', Number(e.target.value))}
                        className="w-full bg-transparent border-b border-transparent focus:border-[var(--accent)] outline-none px-2 py-1"
                        placeholder="مثال: 21581903"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input 
                        type="text" 
                        value={p.productTitle} 
                        onChange={e => updateProductRow(i, 'productTitle', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent focus:border-[var(--accent)] outline-none px-2 py-1"
                        placeholder="عنوان کالا"
                      />
                    </td>
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
            هیچ محصولی انتخاب نشده است. فیکسچر بارگیری کنید یا ردیف جدید اضافه کنید.
          </p>
        )}
      </div>

      {/* Execution Panel */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-4 border-b border-[var(--border)] pb-4">
          <button 
            className="btn-primary flex-1 py-3 text-base justify-center" 
            onClick={handleRun} 
            disabled={products.length === 0 || running}
          >
            {running ? 'در حال اجرا…' : 'شروع ایجاد تنوع'}
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

        {/* Progress & Results */}
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
