'use client';

export default function CreateOrderLoading() {
  return (
    <div className="min-h-screen w-[90vw] bg-zinc-950 p-4 text-white animate-pulse">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-800" />
          <div className="h-8 w-48 rounded bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Generate 6 section skeletons */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-800" />
                  <div className="h-6 w-48 rounded bg-gray-800" />
                </div>
                {/* Form fields skeleton */}
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j}>
                        <div className="h-4 w-24 rounded bg-gray-800 mb-2" />
                        <div className="h-10 w-full rounded bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="h-[300px] rounded-lg bg-gray-800" />

            {/* Logistics card */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-32 rounded bg-gray-800" />
                <div className="h-10 w-[160px] rounded bg-gray-800" />
              </div>
              
              {/* Logistics options */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mb-2 rounded-lg border border-zinc-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-gray-800" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-gray-800" />
                        <div className="h-4 w-24 rounded bg-gray-800" />
                      </div>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}