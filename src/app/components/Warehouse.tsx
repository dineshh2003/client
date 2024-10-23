import React, { useState } from 'react';
import AddressCard from '../utils/WarehouseCard'; // Assuming AddressCard is in the utils directory
import WarehouseAddressForm from '../utils/WarehouseForm'; // Import the AddressForm component

import { motion } from 'framer-motion';

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
  const [isAddingNew, setIsAddingNew] = useState(false);

  const toggleForm = () => setIsAddingNew((prev) => !prev);

  return (
    <div className="flex flex-col justify-center my-24 px-8 relative bg-neutral-900 h-[80vh] rounded-xl p-3">
      {!isAddingNew ? (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Pickup Address</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={toggleForm}>
              Add New
            </button>
          </div>

          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-scroll scrollbar-hide"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {addresses.map((address) => (
              <motion.div key={address.id} variants={cardVariants}>
                <AddressCard key={address.id} address={address} />
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