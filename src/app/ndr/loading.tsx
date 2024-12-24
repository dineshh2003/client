'use client';

export default function NDRLoading() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-48 bg-zinc-700 rounded-lg"></div>
            <div className="h-10 w-44 bg-zinc-700 rounded-lg"></div>
          </div>
          <div className="h-10 w-32 bg-zinc-700 rounded-lg"></div>
        </div>

        {/* Main Stats */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <div className="flex justify-between">
            <div className="space-y-4 w-full">
              <div className="h-8 w-64 bg-zinc-700 rounded"></div>
              <div className="h-4 w-full max-w-xl bg-zinc-700 rounded"></div>
              <div className="flex gap-4 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-zinc-900/50 px-6 py-4 rounded-lg w-36">
                    <div className="h-6 w-16 bg-zinc-700 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-zinc-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block h-64 w-64 bg-zinc-700 rounded-full"></div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-800 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-zinc-700 rounded-full"></div>
                <div>
                  <div className="h-8 w-24 bg-zinc-700 rounded mb-2"></div>
                  <div className="h-4 w-16 bg-zinc-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-zinc-800 p-6 rounded-lg">
            <div className="h-6 w-48 bg-zinc-700 rounded mb-4"></div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="bg-zinc-900/50 p-4 rounded-lg">
                  <div className="h-6 w-full bg-zinc-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg">
            <div className="h-6 w-48 bg-zinc-700 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-64 bg-zinc-700 rounded"></div>
                  <div className="h-4 w-32 bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}