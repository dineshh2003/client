import React from 'react';
import { motion } from 'framer-motion';

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

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <motion.div
      className="bg-[#22232a] p-6 rounded-xl shadow-lg text-white w-[400px] relative font-poppins"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
    >
      {address.isDefault && (
        <div className="absolute top-4 left-4 bg-[#0B815A] px-2 py-1 text-xs rounded-md">
          DEFAULT
        </div>
      )}

      <div className="flex items-center mb-4">
        <div className="bg-[#ff866d] w-10 h-10 rounded-full flex items-center justify-center font-medium">
          {address.name.split(' ')[0].charAt(0) + address.name.split(' ')[1]?.charAt(0)}
        </div>

        <div className="ml-3">
          <div className="font-semibold text-lg">{address.name}</div>
          <div className="text-sm text-gray-400">ID: {address.id}</div>
        </div>

        <div className="ml-auto">
          <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">
            {address.status}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-300 mb-3">
        {address.street}, {address.city}, {address.state} - {address.postalCode}
      </div>

      <div className="text-sm text-gray-400 mb-3">
        <strong>GST Number:</strong> <span className="text-white">{address.gstNumber}</span>
      </div>

      <div className="text-sm text-gray-400 mb-3">
        <strong>Phone:</strong> <span className="text-white">{address.phone}</span>
      </div>

      <div className="text-sm text-gray-400">
        <strong>Email:</strong> <span className="text-white">{address.email}</span>
      </div>
    </motion.div>
  );
};

export default AddressCard;
