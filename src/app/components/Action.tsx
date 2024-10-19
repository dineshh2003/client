import { Cancel } from '@mui/icons-material'
import { Divider } from '@mui/material'
import React from 'react'
import CustomCheckbox from '../utils/CustomCheckbox'
import SplitButton from '../utils/ButtonGrp'
import CompanyCard from './CompanyCard'

// Array of courier companies for mapping
const companies = [
  {
    name: 'Delhivery',
    rating: '4.8',
    method: 'Surface',
    cost: '134.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  {
    name: 'Delhivery',
    rating: '4.2',
    method: 'Surface',
    cost: '122.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  {
    name: 'Blue Dart',
    rating: '4.5',
    method: 'Air',
    cost: '156.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  {
    name: 'Delhivery',
    rating: '4.8',
    method: 'Surface',
    cost: '134.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  {
    name: 'Delhivery',
    rating: '4.2',
    method: 'Surface',
    cost: '122.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  {
    name: 'Blue Dart',
    rating: '4.5',
    method: 'Air',
    cost: '156.10',
    estDelivery: '13 Oct , 2024',
    pickup: 'Tomorrow',
    weight: '4-5 days'
  },
  // Add the rest of the company details here from the image
];

const Action = () => {
  return (
    <div className='container bg-[#292b35] flex flex-row h-[90vh] w-[80vw] px-8 border-2 rounded-xl border-[#42C195]'>
        <div className='container flex flex-col mx-1 my-9 px-auto py-4 h-[70vh] w-[12vw]'>
            <header className='text-4xl font-thin text-[#42C195]'>
                <h1>Order Details</h1>
            </header>
            <div className='container font-normal mt-8'>
                <h3 className='text-gray-400 text-lg'>Pickup from:</h3>
                <h2 className='text-gray-100 text-xl'>751021, Sailashree Vihar</h2>
            </div>
            <div className='container font-normal mt-8'>
                <h3 className='text-gray-400 text-lg'>Deliver To:</h3>
                <h2 className='text-gray-100 text-xl'>751021, Sailashree Vihar</h2>
            </div>
            <div className='container font-normal mt-8'>
                <h2 className='text-gray-100 text-xl'>$ 1500.95</h2>
            </div>
            <div className='container font-normal mt-8'>
                <h3 className='text-gray-400 text-lg'>Payment Method</h3>
                <h2 className='text-gray-100 text-xl'>COD</h2>
            </div>
            <div className='container font-normal mt-8'>
                <h3 className='text-gray-400 text-lg'>Applicable Weight (in Kg)</h3>
                <h2 className='text-gray-100 text-xl'>0.345 Kg</h2>
            </div>
        </div>
        
        <div className='divider bg-[#1d1f27] h-[80vh] my-auto w-0 border-2 border-[#303032] rounded-xl'>
        </div>
        
        <div className='container flex flex-col mx-1 my-5 px-auto py-4 h-[80vh] w-[68vw]'>
            <button className='flex justify-end rounded-full text-gray-400'>
                <Cancel />
            </button>
            <div className='flex flex-col justify-start h-[10vh]'>
                <h3 className='flex text-[#42C195] text-4xl mx-4 font-thin'>Select Courier Partner</h3>
                <div className='flex justify-between mx-4 mt-4'>
                    <h2 className='flex text-gray-300 text-xl'>0.345 Kg</h2>
                    <div className='flex'>
                        <SplitButton />
                    </div>
                </div>
            </div>

            <div className='Companies-Name grid grid-cols-3 gap-4 mt-8 mx-4 overflow-auto scrollbar-none'>
                {companies.map((company, index) => (
                    <CompanyCard
                      key={index}
                      name={company.name}
                      rating={company.rating}
                      method={company.method}
                      cost={company.cost}
                      estDelivery={company.estDelivery}
                      pickup={company.pickup}
                      weight={company.weight}
                    />
                ))}
            </div>
        </div>
    </div>
  );
}

export default Action;
