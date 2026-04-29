import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabaseUrl } from '@/lib/supabase';

function Home() {
  useEffect(() => {
    console.log('Supabase client initialized: ' + supabaseUrl);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Nexus Core</h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Cryptographic coordination infrastructure for hierarchically governed communities
        </p>
        <small className="block text-sm text-slate-400">Phase 0 — Scaffold</small>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
