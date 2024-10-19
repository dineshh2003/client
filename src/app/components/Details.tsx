"use client"

import { Cancel } from '@mui/icons-material'
import React from 'react'
import { motion } from 'framer-motion'


const buyerIntent="High"
const riskLevel="Medium"
const buyerName="Dinesh"

type DetailsProps = {
  buyerIntent: string;
  riskLevel: string;
  buyerName: string;
  customer: {
    fullName: string;
    address: string;
    mobile: string;
  };
  product: {
    name: string;
    price: string;
  };
  extraCharges: {
    shipping: string;
    transaction: string;
    discount: string;
  };
}

const Details: React.FC<DetailsProps> = ({ buyerIntent, riskLevel, buyerName, customer, product, extraCharges }) => {

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className='container bg-[#292b35] flex flex-row h-[90vh] w-[80vw] px-8 border-2 rounded-xl border-[#42C195]'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='container flex flex-col mx-1 my-9 px-auto py-4 h-[70vh] w-[12vw]'>
        <header className='text-4xl font-thin text-[#42C195]'>
          <h1>Details</h1>
        </header>

        <div className='container font-normal mt-8'>
          <h3 className='text-gray-400 text-lg'>Buyer Intent</h3>
          <h2 className='text-gray-100 text-xl'>{buyerIntent || 'Not available'}</h2>
        </div>

        <div className='container font-normal mt-8'>
          <h3 className='text-gray-400 text-lg'>Risk Level</h3>
          <h2 className='text-gray-100 text-xl'>{riskLevel || 'Not available'}</h2>
        </div>

        <div className='container font-normal mt-8'>
          <h3 className='text-gray-400 text-lg'>Open Buyer Chat</h3>
          <h2 className='text-gray-100 text-xl'>{buyerName || 'Not available'}</h2>
        </div>

        <button className='container mt-80 bg-[#42C195] text-xl text-gray-100 rounded-lg mx-auto p-2 px-5 w-auto'>
          More Option
        </button>
      </div>
      
      <div className='divider bg-[#1d1f27] h-[80vh] my-auto w-px rounded-xl'></div>

      <div className='container flex flex-col mx-1 my-5 px-auto py-4 h-[80vh] w-[68vw]'>
        <button className='flex justify-end rounded-full text-gray-400'>
          <Cancel />
        </button>

        <div className='parcel-details grid grid-cols-2 gap-4'>
          <div className='bg-[#1d1f27] p-4 rounded-lg border border-[#42C195]'>
            <h3 className='text-gray-400 text-lg'>Customer Details</h3>
            <p className='text-gray-100'>{customer.fullName || 'N/A'}</p>
            <p className='text-gray-100'>{customer.address || 'N/A'}</p>
            <p className='text-gray-100'>{customer.mobile || 'N/A'}</p>
          </div>

          <div className='bg-[#1d1f27] p-4 rounded-lg border border-[#42C195]'>
            <h3 className='text-gray-400 text-lg'>Product</h3>
            <p className='text-gray-100'>{product.name || 'N/A'}</p>
            <p className='text-gray-100'>{product.price || 'N/A'}</p>
          </div>

          <div className='bg-[#1d1f27] p-4 rounded-lg border border-[#42C195]'>
            <h3 className='text-gray-400 text-lg'>Extra Charges</h3>
            <p className='text-gray-100'>Shipping: {extraCharges.shipping || 'N/A'}</p>
            <p className='text-gray-100'>Transaction: {extraCharges.transaction || 'N/A'}</p>
            <p className='text-gray-100'>Discount: {extraCharges.discount || 'N/A'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Details
