'use client';
import { useTheme } from "next-themes"

function BankDetailsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
        <div className="h-4 w-96 bg-gray-800 rounded" />
      </div>

      <div className="border border-gray-800 bg-gray-900 rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`grid gap-2 ${i === 6 ? 'sm:col-span-2' : ''}`}>
              <div className="h-4 w-32 bg-gray-800 rounded" />
              <div className="h-10 w-full bg-gray-800 rounded" />
            </div>
          ))}
        </div>
        <div className="h-10 w-full bg-purple-800 rounded mt-4" />
      </div>
    </div>
  );
}

function SettingsSidebarLoading() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`grid min-h-screen w-full lg:grid-cols-[280px_1fr] ${isDark ? 'bg-gray-900' : 'bg-gray-100'} mt-[2vh] rounded-md`}>
      <div className={`hidden border-r ${isDark ? 'border-gray-800' : 'border-gray-200'} lg:block`}>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-2 px-2">
            <div className={`h-6 w-6 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded`} />
            <div className={`h-6 w-24 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded`} />
          </div>
          
          {[...Array(3)].map((_, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-1">
                <div className={`h-4 w-4 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded`} />
                <div className={`h-4 w-32 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded`} />
              </div>
              {[...Array(sectionIndex === 0 ? 5 : sectionIndex === 1 ? 3 : 3)].map((_, itemIndex) => (
                <div key={itemIndex} className={`h-8 w-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded-lg mx-2`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex-1 p-6">
          <BankDetailsLoading />
        </main>
      </div>
    </div>
  )
}

export default SettingsSidebarLoading

