'use client';

import { useState, useCallback, useEffect } from 'react';
import type { IpcProgressEvent } from '../globals.d';
import { api } from '../../lib/api';

interface RowStatus {
  index: number;
  title: string;
  status: string;
}

const DEFAULT_PRODUCTS = JSON.stringify([
  { productId: 12345678, productTitle: 'Sample Product A' },
  { productId: 87654321, productTitle: 'Sample Product B' },
], null, 2);

const DEFAULT_CONFIG = JSON.stringify({
  themeId: 13075,
  site: 'digikala',
  defaults: {
    seller_min_lead_time: 0,
    seller_max_lead_time: 3,
    package_width: 70,
    package_height: 6,
    package_length: 100,
    package_weight: 1200,
  },
  sizes: [
    { key: '100x70', themeValueId: 14542, price: 1200000, warrantyId: 0, active: true },
    { key: '80x60', themeValueId: 14541, price: 900000, warrantyId: 0, active: true },
  ],
}, null, 2);

export default function VariantsPage() {
  const [productsJson, setProductsJson] = useState(DEFAULT_PRODUCTS);
  const [configJson, setConfigJson]     = useState(DEFAULT_CONFIG);
  const [dryRun, setDryRun]             = useState(false);
  const [running, setRunning]           = useState(false);
  const [rows, setRows]                 = useState<RowStatus[]>([]);
  const [result, setResult]             = useState<string | null>(null);
  const [jsonError, setJsonError]       = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = api.onVariantProgress((data: IpcProgressEvent) => {
      setRows((prev) => {
        const existing = prev.findIndex((r) => r.index === data.index);
        const entry: RowStatus = { index: data.index, title: data.title, status: data.status };
        if (existing >= 0) {
          const next = [...prev]; next[existing] = entry; return next;
        }
        return [...prev, entry];
      });
    });
    return () => unsubscribe?.();
  }, []);

  const chipClass = (status: string) => {
    if (status.includes('success')) return 'chip-success';
    if (status === 'failed')        return 'chip-error';
    if (status.includes('skipped')) return 'chip-warn';
    if (status === 'processing')    return 'chip-info';
    return 'chip-muted';
  };

  const handleRun = useCallback(async () => {
    let products: any[];
    let config: any;
    try {
      products = JSON.parse(productsJson);
      config = JSON.parse(configJson);
      setJsonError(null);
    } catch {
      setJsonError('Invalid JSON. Fix products/config before running.');
      return;
    }
    setRunning(true);
    setRows([]);
    setResult(null);
    try {
      const res = await api.runVariantCreation(products, config, dryRun);
      setResult(res.success
        ? `✅ Completed${dryRun ? ' (dry-run)' : ''}: ${res.results?.filter((r: any) => String(r.status).includes('success')).length} products processed successfully.`
        : `❌ Error: ${res.error}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Variant creation failed';
      setResult(`❌ Error: ${message}`);
    } finally {
      setRunning(false);
    }
  }, [productsJson, configJson, dryRun]);

  const total = rows.length;
  const done  = rows.filter(r => !r.status.includes('processing')).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Variant Creator</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          Generate product variants with idempotency checks and optional dry-run mode.
        </p>
      </div>

      {/* Product list input */}
      <div className="glass-card p-5 space-y-3">
        <label className="text-sm font-medium text-[var(--foreground-muted)]">
          Products (JSON array with <code className="text-[var(--accent)]">productId</code> and <code className="text-[var(--accent)]">productTitle</code>)
        </label>
        <textarea
          id="products-json"
          rows={8}
          value={productsJson}
          onChange={(e) => setProductsJson(e.target.value)}
          className="w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-y"
        />
        {jsonError && <p className="text-xs text-red-400">{jsonError}</p>}

        <label className="text-sm font-medium text-[var(--foreground-muted)] pt-2 block">
          Variant Config JSON (<code className="text-[var(--accent)]">themeId</code>, <code className="text-[var(--accent)]">sizes</code>, optional <code className="text-[var(--accent)]">defaults</code>)
        </label>
        <textarea
          id="config-json"
          rows={10}
          value={configJson}
          onChange={(e) => setConfigJson(e.target.value)}
          className="w-full bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-y"
        />

        <div className="flex items-center justify-between pt-1">
          {/* Dry-run toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="dry-run-toggle"
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              className="accent-[var(--accent)] w-4 h-4"
            />
            <span className="text-sm text-[var(--foreground-muted)]">Dry-run (simulate only)</span>
          </label>
          <button
            id="run-variants-btn"
            onClick={handleRun}
            disabled={running}
            className="btn-primary"
          >
            {running ? 'Running…' : dryRun ? '▶ Simulate' : '▶ Run Creation'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="glass-card p-5 space-y-3">
          <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
            <span>{done} / {total} products processed</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--surface-alt)] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))' }} />
          </div>
        </div>
      )}

      {result && (
        <div className={`glass-card p-4 text-sm font-medium ${result.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {result}
        </div>
      )}

      {/* Results table */}
      {rows.length > 0 && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border)]">
              <tr className="text-left text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((row) => (
                <tr key={row.index} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                  <td className="px-4 py-3 text-[var(--foreground-muted)]">{row.index + 1}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3"><span className={chipClass(row.status)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
