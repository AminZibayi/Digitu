'use client';
import { useEffect, useState } from 'react';
import { fetchFixtures, runVariantFixture, uploadCSVFixture } from '../../lib/api';

export default function VariantsPage() {
  const [fixtures, setFixtures] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [newName, setNewName] = useState('');
  const [running, setRunning] = useState(false);

  const load = () => fetchFixtures().then(d => setFixtures(d.fixtures || [])).catch(() => setFixtures([]));
  useEffect(() => { load(); }, []);

  const handleUpload = async () => {
    if (!file || !newName) return;
    const text = await file.text();
    await uploadCSVFixture(newName, text);
    setNewName('');
    setFile(null);
    load();
  };

  const handleRun = async () => {
    if (!selected) return;
    setRunning(true);
    try {
      await runVariantFixture(selected, { themeId: 1, sizes: [{key: 'M', themeValueId: 10, price: 100}] }, false); 
      alert('اجرا با موفقیت انجام شد!');
    } catch (e) {
      alert('اجرا ناموفق بود');
    }
    setRunning(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ایجادکننده تنوع</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          فیکسچر موجود را انتخاب کرده یا داده‌های جدید (CSV) را آپلود کنید تا تنوع‌ها ساخته شوند.
        </p>
      </div>

      <div className="glass-card p-5 space-y-6">
        {/* Select Existing Fixture */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-[var(--foreground-muted)]">انتخاب فیکسچر</label>
          <div className="flex gap-3">
            <select 
              className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
              value={selected} 
              onChange={e => setSelected(e.target.value)}
            >
              <option value="">-- انتخاب فیکسچر --</option>
              {fixtures.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <button className="btn-ghost" onClick={load}>بروزرسانی</button>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-4 text-[var(--foreground-muted)] text-sm">
          <div className="h-px bg-[var(--border)] flex-1"></div>
          <span>یا</span>
          <div className="h-px bg-[var(--border)] flex-1"></div>
        </div>

        {/* Upload New Fixture */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-[var(--foreground-muted)]">آپلود CSV جدید</label>
          <div className="flex gap-3 items-center">
            <input 
              type="text" 
              placeholder="نام فیکسچر جدید" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              className="flex-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors" 
            />
            <input 
              type="file" 
              accept=".csv" 
              onChange={e => setFile(e.target.files?.[0] || null)} 
              className="text-sm text-[var(--foreground-muted)]"
            />
            <button className="btn-ghost" onClick={handleUpload}>آپلود CSV</button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        className="btn-primary w-full justify-center py-3 text-base" 
        onClick={handleRun} 
        disabled={!selected || running}
      >
        {running ? 'در حال اجرا…' : 'شروع ایجاد تنوع'}
      </button>
    </div>
  );
}