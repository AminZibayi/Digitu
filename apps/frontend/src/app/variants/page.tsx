'use client';
import { useEffect, useState } from 'react';
import { fetchFixtures, runVariantFixture, uploadCSVFixture } from '../../lib/api';

export default function VariantsPage() {
  const [fixtures, setFixtures] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [newName, setNewName] = useState('');
  const [running, setRunning] = useState(false);

  const load = () => fetchFixtures().then(d => setFixtures(d.fixtures || []));
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
    // You can hardcode a config for now or keep existing ones if any
    try {
      await runVariantFixture(selected, { themeId: 1, sizes: [{key: 'M', themeValueId: 10, price: 100}] }, false); 
      alert('Run complete!');
    } catch (e) {
      alert('Run failed');
    }
    setRunning(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Variant Creator</h1>
      
      <div className="border p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">1. Select Fixture</h2>
        <div className="flex space-x-2">
          <select className="border p-2 rounded text-black" value={selected} onChange={e => setSelected(e.target.value)}>
            <option value="">-- Select Fixture --</option>
            {fixtures.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="border p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">2. Upload New CSV Fixture</h2>
        <input type="text" placeholder="New Fixture Name" value={newName} onChange={e => setNewName(e.target.value)} className="border p-2 rounded mr-2 text-black" />
        <input type="file" accept=".csv" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpload}>Upload CSV</button>
      </div>

      <button className={`px-6 py-2 rounded font-bold text-white ${running ? 'bg-gray-500' : 'bg-indigo-600'}`} onClick={handleRun} disabled={!selected || running}>
        {running ? 'RUNNING...' : 'RUN VARIANT CREATOR'}
      </button>
    </div>
  );
}