'use client';

export default function AuthLoading() {
  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white">
        <div className="p-10">
          <div className="bg-gray-200 h-[750px] w-[750px] rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center items-center font-roboto bg-purple-100 p-8">
        <div className="w-full max-w-md p-6 bg-slate-900 rounded-lg animate-pulse">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="h-[100px] w-[100px] rounded-full bg-gray-700 mb-6" />

            {/* Header */}
            <div className="h-8 w-48 bg-gray-700 rounded mb-4" />
            <div className="h-4 w-36 bg-gray-700 rounded mb-6" />

            {/* Form Fields */}
            <div className="space-y-6 w-full">
              <div>
                <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                <div className="h-12 w-full bg-gray-700 rounded" />
              </div>
              
              <div>
                <div className="h-4 w-28 bg-gray-700 rounded mb-2" />
                <div className="h-12 w-full bg-gray-700 rounded" />
              </div>

              <div>
                <div className="h-4 w-20 bg-gray-700 rounded mb-2" />
                <div className="h-12 w-full bg-gray-700 rounded" />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-700 rounded" />
                <div className="h-4 w-28 bg-gray-700 rounded" />
              </div>

              {/* Buttons */}
              <div className="h-12 w-full bg-purple-700 rounded" />
              <div className="h-12 w-full bg-gray-700 rounded" />
            </div>

            {/* Sign Up Link */}
            <div className="h-4 w-64 bg-gray-700 rounded mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}