import React from 'react';

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
    <div className="bg-[#2f3136] p-8 rounded-xl shadow-md text-white w-[600px] relative font-poppins ">
      {address.isDefault && (
        <div className="absolute top-4 left-4 bg-[#0B815A] px-2 py-1 text-xs rounded-md">
          DEFAULT
        </div>
      )}
      <div className="flex items-center mb-4">
        <div className="bg-[#ff866d] w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
          {address.name.split(' ')[0].charAt(0) + address.name.split(' ')[1].charAt(0)}
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
      <div className="text-sm text-gray-300 mb-3 gap-2">
        {address.street}<br />
        {address.city}<br />
        {address.state}, {address.postalCode}
      </div>
      <div className="text-sm text-gray-400 mb-3">
        <div>GST Number</div>
        <div className="text-white">{address.gstNumber}</div>
      </div>
      <div className="text-sm text-gray-400 mb-3">
        <div>Phone</div>
        <div className="text-white">{address.phone}</div>
      </div>
      <div className="text-sm text-gray-400 mb-3">
        <div>Email</div>
        <div className="text-white">{address.email}</div>
      </div>
    </div>
  );
};

export default AddressCard;
