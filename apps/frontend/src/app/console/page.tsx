'use client';

import { useEffect, useRef, useState } from 'react';
import type { LogEntry } from '../globals.d';
import { api } from '../../lib/api';

const LEVEL_CLASS: Record<string, string> = {
  error: 'text-red-400',
  warn:  'text-amber-400',
  info:  'text-blue-400',
  debug: 'text-[var(--foreground-muted)]',
};

const CHIP: Record<string, string> = {
  error: 'chip-error',
  warn:  'chip-warn',
  info:  'chip-info',
  debug: 'chip-muted',
};

export default function ConsolePage() {
  const [logs, setLogs]       = useState<LogEntry[]>([]);
  const [filter, setFilter]   = useState<string>('all');
  const [search, setSearch]   = useState('');
  const [paused, setPaused]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = api.onLogMessage((entry: LogEntry) => {
      if (!paused) {
        setLogs((prev) => [...prev.slice(-499), entry]); // cap at 500 entries
      }
    });
    return () => unsubscribe?.();
  }, [paused]);

  useEffect(() => {
    if (!paused) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, paused]);

  const visible = logs.filter((l) => {
    if (filter !== 'all' && l.level !== filter) return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4 h-full">
      <div>
        <h1 className="text-2xl font-bold">Live Console</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          Real-time structured log stream from the Electron backend.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Level filter */}
        {['all', 'info', 'warn', 'error', 'debug'].map((lvl) => (
          <button
            key={lvl}
            id={`filter-${lvl}`}
            onClick={() => setFilter(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
              ${filter === lvl
                ? 'border-[var(--accent)] bg-[var(--accent-glow)] text-white'
                : 'border-[var(--border)] text-[var(--foreground-muted)] hover:border-white/20 hover:text-[var(--foreground)]'}`}
          >
            {lvl.toUpperCase()}
          </button>
        ))}

        {/* Search */}
        <input
          type="text"
          placeholder="Search messages…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg text-xs bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors w-48"
        />

        {/* Pause / clear */}
        <button id="pause-btn" onClick={() => setPaused((p) => !p)} className="btn-ghost text-xs py-1.5 px-3">
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <button id="clear-btn" onClick={() => setLogs([])} className="btn-ghost text-xs py-1.5 px-3">
          🗑 Clear
        </button>
      </div>

      {/* Log list */}
      <div className="glass-card flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 min-h-[420px]">
        {visible.length === 0 && (
          <p className="text-[var(--foreground-muted)] text-center mt-16">
            {logs.length === 0 ? 'Waiting for log events from the backend…' : 'No entries match your filter.'}
          </p>
        )}
        {visible.map((entry, i) => (
          <div key={i} className={`flex gap-3 items-start hover:bg-white/5 px-2 py-1 rounded-lg transition-colors ${LEVEL_CLASS[entry.level] ?? ''}`}>
            <span className="text-[var(--foreground-muted)] shrink-0 tabular-nums w-[170px]">
              {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour12: false, fractionalSecondDigits: 3 })}
            </span>
            <span className={`shrink-0 ${CHIP[entry.level] ?? 'chip-muted'}`}>{entry.level}</span>
            <span className="break-all">{entry.message}
              {entry.data && (
                <span className="text-[var(--foreground-muted)] ml-2">{JSON.stringify(entry.data)}</span>
              )}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <p className="text-[10px] text-[var(--foreground-muted)]">{visible.length} entries shown · capped at 500</p>
    </div>
  );
}
