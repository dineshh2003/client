import { Info } from '@mui/icons-material';
import React from 'react';
import { TruckLoadIcon } from '../app/utils/Icons';

// Define the types for the props
interface CompanyCardProps {
  name: string;
  rating: string;
  method: string;
  cost: string;
  estDelivery: string;
  pickup: string;
  weight: string;
}

// CompanyCard component with typed props
const CompanyCard: React.FC<CompanyCardProps> = ({ name, rating, method, cost, estDelivery, pickup, weight }) => {
  return (
    <div className="bg-[#292b35] border-2 border-[#42C195] rounded-2xl p-6 w-[300px] relative">
      {/* Company Logo */}
      <div className="absolute flex flex-row top-4 gap-4 left-4 mb-4">
        <img
          src="https://uknowva.com/images/casestudy/delhivery/logo.png" // Replace with actual logo
          alt={`${name} logo`}
          className="w-10 h-10 object-contain"
        />
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold text-gray-300">{name}</h3>
      </div>
      </div>

      {/* Delivery Method */}
      <div className="flex justify-start gap-3 items-center mb-4 mt-12">
        <TruckLoadIcon/>
        <span className=" text-xs bg-[#42C195] text-white px-3 py-1 rounded-full">{method}</span>
      </div>

        <div className='container flex flex-row '>
      <div className="text-gray-400 text-lg">
        <p className="text-gray-500">Pickup:</p>
        <span className="text-gray-100">{pickup}</span>
        <p className="text-gray-500 mt-2">EDD:</p>
        <span className="text-gray-100">{estDelivery}</span>
        <p className="text-gray-500 mt-1">Est. delivery time:</p>
        <span className="text-gray-100">{weight}</span>
      </div>
      <div className="flex justify-center items-center  mb-4">
        <div className="w-16 h-16 mx-8 bg-transparent rounded-full border-4 border-[#42C195] flex justify-center items-center">
          <span className="text-2xl text-gray-100">{rating}</span>
        </div>
      </div>
        </div>

      {/* Cost and Info Button */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-[#42C195]">
          <Info />
        </button>
        <button className='bg-[#42C195] hover:bg-[#292b35] rounded-xl w-auto p-2 '>
        <span className="text-lg text-gray-300 hover:text-[#42C195] font-bold">${cost}</span>
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
