
import React from 'react'
import Details from "../components/Details";
import Action from '../components/Action';

const page = () => {

    const customerDetails = {
        fullName: 'Kanha',
        address: 'Plot 20, Bharat Vila, Hanspal',
        mobile: '987654321'
    }
    
    const productDetails = {
        name: 'Gschock | GMP | Metal Chain',
        price: '$150.95'
    }
    
    const extraCharges = {
        shipping: '$50.95',
        transaction: 'N/A',
        discount: '$12.95'
    }
    
    const buyerIntent = 'yeh kya hai'
    const riskLevel = 'medium'
    const buyerName = 'Dinesh'


  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center bg-[#1d1f27] ">
        {/* <Details 
  buyerIntent={buyerIntent}
  riskLevel={riskLevel}
  buyerName={buyerName}
  customer={customerDetails}
  product={productDetails}
  extraCharges={extraCharges}
/> */}
<Action/>

    </div>
  )
}

export default page
