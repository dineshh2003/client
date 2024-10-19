import React from 'react'
import { CircleIcon } from '../utils/Icons' // Assuming you have this icon available

const ProgressBar = () => {
  return (
    <div className="flex flex-col justify-start mt-2 bg-[#292b35] p-2 rounded-2xl  w-full">
      {/* Statistics Header */}
      <h1 className="text-gray-400 text-2xl mb-4">Statistics</h1>

      {/* Container for stats cards */}
      <div className='flex justify-between border p-4 rounded-xl border-[#6fedc7]'>
        {/* Card 1 */}
        <div className='flex flex-row justify-center items-center bg-[#1d1f27] px-6 gap-7 py-4 rounded-lg'>
          <div className="flex flex-col  items-center space-x-2 gap-2">
            <h1 className="text-4xl text-[#6fedc7]">420</h1>
          <h2 className="text-gray-400 text-lg">Total Orders</h2>
          </div>
          <CircleIcon />
          <span className="text-gray-400 text-xs mt-2">All</span>
        </div>

        {/* Card 2 */}
        <div className='flex flex-row justify-center items-center bg-[#1d1f27] px-6 gap-7 py-4 rounded-lg'>
          <div className="flex flex-col  items-center space-x-2">
            <h1 className="text-4xl text-[#6fedc7]">95</h1>
          <h2 className="text-gray-400  text-lg">Approved Order</h2>
          </div>
          <CircleIcon />
          <span className="text-gray-400 text-xs mt-2">All</span>
        </div>

        {/* Card 3 */}
        <div className='flex flex-row justify-center items-center bg-[#1d1f27] px-6 gap-7 py-4 rounded-lg'>
          <div className="flex flex-col  items-center space-x-2">
            <h1 className="text-4xl text-[#6fedc7]">231</h1>
          <h2 className="text-gray-400  text-lg">Pending Orders</h2>
          </div>
          <CircleIcon />
          <span className="text-gray-400 text-xs mt-2">All</span>
        </div>

        {/* Card 4 */}
        <div className='flex flex-row justify-center items-center bg-[#1d1f27] px-6 gap-7 py-4 rounded-lg'>
          <div className="flex flex-col  items-center space-x-2">
            <h1 className="text-4xl text-[#6fedc7]">91</h1>
          <h2 className="text-gray-400  text-lg">Converted to Prepaid</h2>
          </div>
          <CircleIcon />
          <span className="text-gray-400 text-xs mt-2">All</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
