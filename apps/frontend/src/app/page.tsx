export default function Dashboard() {
  const stats = [
    { label: 'Products Uploaded', value: '—', icon: '📦', color: '#ef394e' },
    { label: 'Variants Created',  value: '—', icon: '🧩', color: '#7c5cbf' },
    { label: 'Last Run',          value: 'Never', icon: '🕒', color: '#22c55e' },
    { label: 'DB Status',         value: 'Healthy', icon: '🗄️', color: '#3b82f6' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          System overview and quick actions for your automation suite.
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
            <span>📤</span> Product Uploader
          </h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            Upload products in bulk from a CSV file. Real-time progress tracking with per-row status.
          </p>
          <a href="/uploader" className="btn-primary w-full text-center">Open Uploader</a>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
            <span>🧩</span> Variant Creator
          </h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            Auto-generate size and price variants with idempotency protection and dry-run support.
          </p>
          <a href="/variants" className="btn-primary w-full text-center">Open Creator</a>
        </div>
      </div>

      {/* Connectivity status */}
      <div className="glass-card p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">🔗</span>
          <div>
            <div className="text-sm font-medium">Digikala Seller API</div>
            <div className="text-xs text-[var(--foreground-muted)]">Configure your session cookie to enable services</div>
          </div>
        </div>
        <span className="chip-warn">Not configured</span>
      </div>
    </div>
  );
}
