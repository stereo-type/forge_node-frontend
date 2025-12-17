'use client';

import { useState } from 'react';

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    setHealthStatus(null);
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealthStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setHealthStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Forge Node</h1>
        <p className="text-lg text-gray-600">
          Workflow Automation Platform
        </p>
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={checkHealth}
            disabled={loading}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : 'Check Backend Health'}
          </button>
          {healthStatus && (
            <pre className="mt-4 p-4 bg-gray-100 rounded-lg max-w-2xl overflow-auto text-sm text-black">
              {healthStatus}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
}
