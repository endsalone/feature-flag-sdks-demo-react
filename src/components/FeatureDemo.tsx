"use client";

import { useFeatureFlag } from 'feature-flag-sdk-react';

export default function FeatureDemo() {
  const { isFeatureEnabled, getFeature, features, loading, error } = useFeatureFlag();
  const isNewFeatureEnabled = isFeatureEnabled('nova-interface');
  const btnColor = getFeature('cores-padroes');

  if (loading) {
    return (
      <div className="w-full max-w-2xl p-6 border rounded-lg bg-zinc-900 border-zinc-800 animate-pulse">
        <div className="h-6 bg-zinc-800 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-zinc-800 rounded"></div>
          <div className="h-40 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl p-6 border rounded-lg bg-red-950/20 border-red-900">
        <h3 className="text-red-400 font-bold mb-2">Error Loading Features</h3>
        <p className="text-red-200/80 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Interactive Demo Section */}
      <div className="p-6 border rounded-lg shadow-md bg-zinc-900 border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-white">Feature Demo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <span className="text-gray-300 font-mono text-sm">new-ui-feature</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${isNewFeatureEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {isNewFeatureEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          
          {isNewFeatureEnabled && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 text-sm">
              ✨ This content is dynamically revealed because the feature flag is active.
            </div>
          )}
        </div>
      </div>

      {/* Colors Demo Section */}
      <div className="p-6 border rounded-lg shadow-md bg-zinc-900 border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-white">Colors Demo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50" style={{ backgroundColor: btnColor }}>
            <span className="text-gray-300 font-mono text-sm">cores-padroes</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${btnColor}`}>{btnColor}</span>
          </div>
        </div>
      </div>

      {/* Raw JSON View Section */}
      <div className="p-6 border rounded-lg shadow-md bg-zinc-900 border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">All Features</h2>
          <span className="text-xs text-zinc-500 font-mono">readonly</span>
        </div>
        <div className="relative group">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">JSON</div>
          </div>
          <pre className="p-4 bg-black rounded-lg border border-zinc-800 overflow-x-auto">
            <code className="font-mono text-sm text-green-400">
              {JSON.stringify(features, null, 2)}
            </code>
          </pre>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Real-time view of the feature flags returned by the SDK.
        </p>
      </div>
    </div>
  );
}
