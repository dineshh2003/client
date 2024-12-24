'use client';

const DashboardLoading = () => {
  return (
    <div className="mx-auto my-8 h-auto w-[90vw]">
      <div className="flex flex-col gap-5">
        {/* Welcome Section Skeleton */}
        <div className="col-span-12 bg-gray-800 p-6 rounded-md shadow-md flex justify-between items-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-600 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-600 rounded"></div>
          </div>
          <div className="h-[75px] w-[75px] bg-gray-600 rounded-full animate-pulse"></div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md animate-pulse">
          <div className="h-6 w-48 bg-gray-600 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-md">
                <div className="h-4 w-24 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Order Skeleton */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md animate-pulse">
          <div className="h-6 w-48 bg-gray-600 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-md">
                <div className="h-4 w-20 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 w-12 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Skeleton */}
        <div className="bg-gray-800 p-6 rounded-md shadow-md animate-pulse">
          <div className="h-6 w-32 bg-gray-600 rounded mb-4"></div>
          <div className="h-[300px] bg-gray-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;