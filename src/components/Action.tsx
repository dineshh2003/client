"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, gql } from "@apollo/client";
import { 
  CALCULATE_SHIPPING_RATES,
  type CalculateShippingRatesResponse,
  type CalculateShippingRatesVariables,
  type ShippingRate
} from '@/graphql/mutations/Shipment';

// Define CreateShipment interfaces
interface AddressInput {
  name: string;
  company_name: string | null;
  phone: string;
  email: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  gstin: string | null;
}

interface OrderItemInput {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  hsn_code: string | null;
  category: string | null;
  actual_weight: number | null;
}

interface CreateShipmentInput {
  accountId: string;
  courier_code: string;
  order_number: string;
  payment_type: 'PREPAID' | 'COD';
  package_weight: number;
  package_length: number;
  package_breadth: number;
  package_height: number;
  order_amount: number | Float64Array;
  collectable_amount: number | Float64Array;
  auto_pickup: boolean;
  consignee: AddressInput;
  pickup: AddressInput;
  items: OrderItemInput[];
}

interface CreateShipmentResponse {
  createShipment: {
    success: boolean;
    tracking_id: string | null;
    courier_awb: string | null;
    label: string | null;
    error: string | null;
  };
}

const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      success
      tracking_id
      courier_awb
      label
      error
    }
  }
`;

interface PickupLocation extends AddressInput {
  address: string;
}

const PICKUP_LOCATIONS: PickupLocation[] = [
  { 
    pincode: "110001",
    address: "Delhi Central",
    name: "Seller Store Delhi",
    company_name: "Delhi Store",
    phone: "9876543211",
    email: "delhi@example.com",
    address_line1: "456 Shop Street Delhi",
    address_line2: "Near Metro",
    city: "Delhi",
    state: "Delhi",
    gstin: "ojvsdoowuouw769"
  },
  { 
    pincode: "400001",
    address: "Mumbai Central",
    name: "Seller Store Mumbai",
    company_name: "Mumbai Store",
    phone: "9876543212",
    email: "mumbai@example.com",
    address_line1: "456 Shop Street Mumbai",
    address_line2: "Near Station",
    city: "Mumbai",
    state: "Maharashtra",
    gstin: "ojvsdoowuouw769"
  },
  { 
    pincode: "700001",
    address: "Kolkata Central",
    name: "Seller Store Kolkata",
    company_name: "Kolkata Store",
    phone: "9876543213",
    email: "kolkata@example.com",
    address_line1: "456 Shop Street Kolkata",
    address_line2: "Near Park",
    city: "Kolkata",
    state: "West Bengal",
    gstin: "ojvsdoowuouw769"
  }
];

const DELIVERY_LOCATIONS = [
  { pincode: "560001", address: "Bangalore Central" },
  { pincode: "600001", address: "Chennai Central" },
  { pincode: "500001", address: "Hyderabad Central" },
];

interface FirestoreOrder {
  ID: string;
  TotalPrice: number | Float64Array;
}

interface ActionProps {
  order: FirestoreOrder;
  onBack: () => void;
}

const Action: React.FC<ActionProps> = ({ order, onBack }) => {
  const [formData, setFormData] = useState({
    pickup: "",
    delivery: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [calculating, setCalculating] = useState(false);

  const [calculateRates] = useMutation<CalculateShippingRatesResponse, CalculateShippingRatesVariables>(
    CALCULATE_SHIPPING_RATES,
    {
      onCompleted: (data) => {
        console.log("Mutation completed with data:", data);
        if (data?.calculateShippingRates?.success) {
          const xpressBeeRates = data.calculateShippingRates.rates.filter(
            rate => rate.courier_code === "XPRESSBEES"
          );
          setShippingRates(xpressBeeRates);
        } else {
          console.error("Failed to calculate rates:", data?.calculateShippingRates?.error);
          setShippingRates([]);
        }
        setCalculating(false);
      },
      onError: (error) => {
        console.error("Mutation error in hook:", error);
        setCalculating(false);
        setShippingRates([]);
      },
    }
  );

  const [createShipment] = useMutation<CreateShipmentResponse>(CREATE_SHIPMENT, {
    onCompleted: (data) => {
      if (data?.createShipment.success) {
        alert(`Shipment created successfully! AWB: ${data.createShipment.courier_awb}`);
      } else {
        alert(`Error: ${data?.createShipment.error}`);
      }
    },
    onError: (error) => {
      alert(`Error creating shipment: ${error.message}`);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.pickup || !formData.delivery || !formData.weight || 
          !formData.length || !formData.width || !formData.height) {
        alert("Please fill in all fields");
        return;
      }

      setShippingRates([]);
      setCalculating(true);

      const variables: CalculateShippingRatesVariables = {
        origin_pincode: parseInt(formData.pickup),
        destination_pincode: parseInt(formData.delivery),
        weight: parseFloat(formData.weight),
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
        collectable_amount: typeof order.TotalPrice === 'number' 
          ? order.TotalPrice 
          : parseFloat(new Float64Array(order.TotalPrice)[0].toString())
      };

      console.log("Calculating rates with variables:", variables);
      await calculateRates({ variables });

    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setCalculating(false);
      setShippingRates([]);
    }
  };

  const handleShipNow = async (rate: ShippingRate) => {
    try {
      const selectedLocation = PICKUP_LOCATIONS.find(loc => loc.pincode === formData.pickup);
      
      if (!selectedLocation) {
        alert("Please select a valid pickup location");
        return;
      }

      const { address, ...pickupData } = selectedLocation;

      const variables = {
        input: {
          accountId: "1",
          courier_code: rate.courier_code,
          order_number: order.ID,
          payment_type: "PREPAID",
          package_weight: parseFloat(formData.weight),
          package_length: parseFloat(formData.length),
          package_breadth: parseFloat(formData.width),
          package_height: parseFloat(formData.height),
          order_amount: typeof order.TotalPrice === 'number' 
            ? order.TotalPrice 
            : parseFloat(new Float64Array(order.TotalPrice)[0].toString()),
          collectable_amount: 0,
          auto_pickup: false,
          consignee: {
            name: "John Doe",
            company_name: "skhvb",
            phone: "9876543210",
            email: "shridhar2104@gmail.com",
            address_line1: "123 Main Street",
            address_line2: "akdhbfkj",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560001",
            gstin: "fgdhbid97239r792s"
          },
          pickup: pickupData,
          items: [{
            name: "Test Product",
            sku: "SKU123",
            quantity: 1,
            price: 1000,
            hsn_code: "skhvbdsj",
            category: "dovuhs",
            actual_weight: 400
          }]
        }
      };

      console.log("Creating shipment with variables:", variables);
      await createShipment({ variables });

    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("Error creating shipment. Please try again.");
    }
  };

  // ... Rest of the component (JSX) remains the same
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onBack}
        />
        <motion.div
          className="relative w-1/2 h-full bg-gray-900 text-white overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          <div className="container p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Order Details {order.ID}</h1>
              <button className="text-gray-400 hover:text-white" onClick={onBack}>
                <X />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Pickup From</label>
                  <select
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  >
                    <option value="">Select Pickup Location</option>
                    {PICKUP_LOCATIONS.map(loc => (
                      <option key={loc.pincode} value={loc.pincode}>
                        {loc.address} - {loc.pincode}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Deliver To</label>
                  <select
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  >
                    <option value="">Select Delivery Location</option>
                    {DELIVERY_LOCATIONS.map(loc => (
                      <option key={loc.pincode} value={loc.pincode}>
                        {loc.address} - {loc.pincode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                  <label className="text-gray-400 text-sm mb-2 block">Order Value</label>
                  <input
                    type="text"
                    value={typeof order.TotalPrice === 'number' 
                      ? order.TotalPrice.toString() 
                      : new Float64Array(order.TotalPrice)[0].toString()}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Length (cm)</label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Width (cm)</label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 p-3 rounded border border-gray-700"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={calculating}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {calculating ? "Calculating..." : "Calculate Shipping Rates"}
              </button>

              {shippingRates.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Available Shipping Rates</h2>
                  {shippingRates.map((rate, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
                      <h3 className="font-medium">{rate.courier_name}</h3>
                      <p className="text-gray-400">Estimated Delivery: {rate.expected_days} days</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-semibold">₹{rate.total_charge}</p>
                        <button
                          onClick={() => handleShipNow(rate)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Ship Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Action;