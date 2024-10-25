import React from 'react';
import { motion } from 'framer-motion';

interface AddressFormProps {
  onCancel: () => void;
}

const WarehouseAddressForm: React.FC<AddressFormProps> = ({ onCancel }) => {
  return (
    <motion.div
      className= " h-[80vh] flex flex-col justify-center items-center bg-[#22232a] text-white p-4 rounded-lg w-[75vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-poppins mb-4 text-gray-400">Edit Pickup Address</h2>
      <button onClick={onCancel} className="absolute top-2 right-2 text-white">
        ✕
      </button>

      <form className="grid gap-4 w-full">
        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-2">Nickname</label>
          <input type="text" placeholder="Enter a nickname" className= "input-field p-5 bg-[#292b35] rounded-xl" />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-2">Address Line 1</label>
          <input type="text" placeholder="Address Line 1" className= "input-field p-5 bg-[#292b35] rounded-xl"  />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-2">Address Line 2</label>
          <input type="text" placeholder="Address Line 2" className= "input-field p-5 bg-[#292b35] rounded-xl"  />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-sm mb-2">Pincode</label>
            <input type="text" placeholder="Pincode" className= "input-field p-5 bg-[#292b35] rounded-xl" />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-sm mb-2">State</label>
            <input type="text" placeholder="State" className= "input-field p-5 bg-[#292b35] rounded-xl" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-sm mb-2">City</label>
            <input type="text" placeholder="City" className= "input-field p-5 bg-[#292b35] rounded-xl"  />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-400 text-sm mb-2">Phone</label>
            <input type="text" placeholder="Phone" className= "input-field p-5 bg-[#292b35] rounded-xl" />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="bg-[#292b35] px-4 py-2 rounded-lg hover:bg-gray-800">
            Update
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default WarehouseAddressForm;
