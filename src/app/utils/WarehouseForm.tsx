import React from 'react';
import { motion } from 'framer-motion';

interface AddressFormProps {
  onCancel: () => void;
}

const WarehouseAddressForm: React.FC<AddressFormProps> = ({ onCancel }) => {
  return (
    <motion.div
      className="relative mt-6 flex flex-col justify-center items-center bg-neutral-800 text-white p-6 rounded-lg w-[75vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-xl font-bold mb-4">Edit Pickup Address</h2>
      
      <button onClick={onCancel} className="absolute top-2 right-2 text-white">
        ✕
      </button>
      
      
      <form className="grid gap-4">
        <div>
          <label>Nickname *</label>
          <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
        </div>
        <div>
          <label>Address Line 1 *</label>
          <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
        </div>
        <div>
          <label>Address Line 2</label>
          <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
        </div>
        <div className="flex gap-4">
          <div>
            <label>Pincode *</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
          <div>
            <label>State *</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label>City *</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label>Email</label>
            <input type="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
          <div>
            <label>Website URL</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>
        </div>
        <div>
          <label>GST No</label>
          <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
        </div>
        
        {/* Status Checkboxes */}
        <div className="flex items-center gap-4">
          <label>Status</label>
          <input type="checkbox" />
          <span>Default</span>
          <input type="checkbox" />
          <span>Active</span>
        </div>

        {/* RTO Address */}
        <div className="flex items-center gap-4">
          <label>RTO Address</label>
          <input type="radio" name="rto" />
          <span>Same as Pickup</span>
          <input type="radio" name="rto" />
          <span>Different RTO Address</span>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onCancel}>Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
        </div>
      </form>
      </motion.div>
  );
};

export default WarehouseAddressForm;
