'use client';

const OrdersLoading = () => {
  return (
    <div className="p-4">
      {/* IndexBar Skeleton */}
      <div className="mb-4 bg-gray-800 p-4 rounded-lg animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-600 rounded"></div>
            ))}
          </div>
          <div className="h-8 w-32 bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* TrackBar Skeleton */}
      <div className="mb-4 bg-gray-800 p-4 rounded-lg animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="h-8 w-32 bg-gray-600 rounded"></div>
            <div className="h-8 w-32 bg-gray-600 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-4 animate-pulse">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-600 rounded"></div>
            ))}
          </div>
          
          {/* Table Rows */}
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-4 mb-4">
              {[...Array(6)].map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-700 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersLoading;