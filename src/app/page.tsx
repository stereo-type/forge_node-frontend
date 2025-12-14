export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Forge Node</h1>
        <p className="text-lg text-gray-600">
          Workflow Automation Platform
        </p>
        <div className="flex gap-4">
          <a
            href="/api/health"
            className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          >
            Check Backend Health
          </a>
        </div>
      </main>
    </div>
  );
}
