import React, { useState } from 'react';
import AddressCard from '../utils/WarehouseCard'; 
import WarehouseAddressForm from '../utils/WarehouseForm'; 
import { motion } from 'framer-motion';
import Link from 'next/link';

const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};



interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  gstNumber: string;
  phone: string;
  email: string;
  status: string;
  isDefault: boolean;
}

// Sample data for addresses
const addresses: Address[] = [
  {
    id: 56365,
    name: 'Shalu Singhal',
    street: 'sc 115 shastri nagar',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    postalCode: '201002',
    gstNumber: 'NA',
    phone: '8851056356',
    email: 'adisinghal2002@gmail.com',
    status: 'Active',
    isDefault: true,
  },
  {
    id: 75354,
    name: 'Demo Void Address',
    street: 'RZ B2',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110045',
    gstNumber: 'NA',
    phone: '8010868667',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
  {
    id: 75305,
    name: 'Vivek - SG Enterprises',
    street: 'Office no - A418 4th Floor, Mohta Market',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    gstNumber: 'NA',
    phone: '8879640860',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
  {
    id: 75354,
    name: 'Demo Void Address',
    street: 'RZ B2',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110045',
    gstNumber: 'NA',
    phone: '8010868667',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
  {
    id: 75305,
    name: 'Vivek - SG Enterprises',
    street: 'Office no - A418 4th Floor, Mohta Market',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    gstNumber: 'NA',
    phone: '8879640860',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
  {
    id: 75354,
    name: 'Demo Void Address',
    street: 'RZ B2',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110045',
    gstNumber: 'NA',
    phone: '8010868667',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
  {
    id: 75305,
    name: 'Vivek - SG Enterprises',
    street: 'Office no - A418 4th Floor, Mohta Market',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    gstNumber: 'NA',
    phone: '8879640860',
    email: 'NA',
    status: 'Active',
    isDefault: false,
  },
];


const Warehouse: React.FC = () => {
  const [isAddingNew, setIsAddingNew] = useState(false);  // Manage form toggle
  const [isBlurred, setIsBlurred] = useState(false);      // Manage blur effect

  const toggleForm = () => setIsAddingNew((prev) => !prev);
  const toggleBlur = () => setIsBlurred((prev) => !prev);  // Toggle blur

  const handleHome = () =>{
      <Link href='/storeorders'/>
  }


  return (
    <div
      className= {`flex flex-col justify-center my-4 px-8 relative bg-[#292b35] h-[90vh] rounded-xl p-3 transition-all duration-300 ${
        isBlurred ? 'blur-md' : 'blur-none'
      }`}
    >
      {!isAddingNew ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <button>
            <h2 className="text-2xl font-bold text-white" onClick={handleHome}>Pickup Address</h2>
            </button>
            <div className="flex gap-4">
              <button
                className="bg-[#12121256] text-white px-4 py-2 rounded-lg"
                onClick={toggleForm}
              >
                Add New
              </button>
            </div>
          </div>

          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-scroll scrollbar-hide "
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {addresses.map((address) => (
              <motion.div key={address.id} variants={cardVariants}>
                <AddressCard address={address} />
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <WarehouseAddressForm onCancel={toggleForm} />
      )}
    </div>
  );
};

export default Warehouse;