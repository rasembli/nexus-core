import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabaseUrl } from '@/lib/supabase';
import { getSodium } from '@/packages/crypto/sodium';

type SodiumStatus = 'loading' | 'ready' | 'error';

const pillClassByStatus: Record<SodiumStatus, string> = {
  loading: 'bg-slate-700 text-slate-200',
  ready: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
};

const pillLabelByStatus: Record<SodiumStatus, string> = {
  loading: 'crypto: loading',
  ready: 'crypto: ready',
  error: 'crypto: error',
};

function Home() {
  const [sodiumStatus, setSodiumStatus] = useState<SodiumStatus>('loading');

  useEffect(() => {
    console.log('Supabase client initialized: ' + supabaseUrl);
    let cancelled = false;
    getSodium()
      .then(() => {
        if (!cancelled) setSodiumStatus('ready');
      })
      .catch((err: unknown) => {
        console.error('libsodium failed to initialize', err);
        if (!cancelled) setSodiumStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Nexus Core</h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Cryptographic coordination infrastructure for hierarchically governed communities
        </p>
        <small className="block text-sm text-slate-400">Phase 1 — Crypto</small>
        <span
          className={`mt-8 inline-block rounded-full px-3 py-1 text-xs ${pillClassByStatus[sodiumStatus]}`}
        >
          {pillLabelByStatus[sodiumStatus]}
        </span>
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
