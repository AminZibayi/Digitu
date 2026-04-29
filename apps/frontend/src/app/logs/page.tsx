'use client';
import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const ws = new WebSocket('ws://localhost:3001/api/logs/stream');
    ws.onmessage = (event) => {
      // The backend now sends JSON entries, so we need to parse them
      try {
        const entry = JSON.parse(event.data);
        const line = `[${entry.timestamp || new Date().toISOString()}] ${entry.level.toUpperCase()}: ${entry.message} ${entry.data ? JSON.stringify(entry.data) : ''}`;
        setLogs(prev => [...prev, line].slice(-1000));
      } catch (e) {
        setLogs(prev => [...prev, event.data].slice(-1000));
      }
    };
    return () => ws.close();
  }, [paused]);

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Real-time Logs</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded text-black" onClick={() => setPaused(!paused)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button className="px-4 py-2 bg-red-200 rounded text-black" onClick={() => setLogs([])}>Clear</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-black text-green-400 p-4 font-mono text-sm rounded whitespace-pre-wrap">
        {logs.map((log, i) => (
          <div key={i} className="mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
}