"use client";

import { FeatureFlagConfig, FeatureFlagProvider } from 'feature-flag-sdk-react';
import FeatureDemo from '@/components/FeatureDemo';
import { useEffect, useState } from 'react';

const DEFAULT_AUTH = 'server-777e651f05acb6e1a1c5f2d0f52f5658';
const STORAGE_KEY = 'feature-flag-auth';

export default function Home() {
  const [authorization, setAuthorization] = useState(DEFAULT_AUTH);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAuthorization(stored);
    }
    setMounted(true);
  }, []);

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setAuthorization(newVal);
    localStorage.setItem(STORAGE_KEY, newVal);
  };

  const sdkConfig: FeatureFlagConfig = {
    authorization: authorization || DEFAULT_AUTH,
    pollingInterval: 1000
  };

  if (!mounted) return null;

  return (
    <FeatureFlagProvider config={sdkConfig}>
      <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-950 text-white">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Feature Flag SDK Demo
          </p>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          React SDK Integration
        </h1>
        
        <div className="w-full max-w-2xl mb-8 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Authorization Token
          </label>
          <input
            type="text"
            value={authorization}
            onChange={handleAuthChange}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
            placeholder="Enter your authorization token..."
          />
          <p className="mt-2 text-xs text-zinc-500">
            This token is persisted in your browser's local storage.
          </p>
        </div>

        <FeatureDemo />
      </main>
    </FeatureFlagProvider>
  );
}
