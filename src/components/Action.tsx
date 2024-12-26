"use client"

import React from "react";
import { Cancel } from "@mui/icons-material";
import CompanyCard from "./CompanyCard";
import { Divider } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion"


interface FirestoreOrder {
  ID: string
  Name: string
  CreatedAt: string
  UpdatedAt: string
  CancelledAt: string | null
  ClosedAt: string | null
  ProcessedAt: string
  Currency: string
  TotalPrice: number
  SubtotalPrice: number
  TotalDiscounts: number
  TotalTax: number
  TaxesIncluded: boolean
  FinancialStatus: string
  FulfillmentStatus: string
  OrderNumber: number
  ShopName: string
  AccountId: string
}


interface ActionProps {
  order: FirestoreOrder;
  onBack: () => void;
}

const companies = [
  { name: "Delhivery", rating: "4.8", method: "Surface", cost: "134.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Blue Dart", rating: "4.5", method: "Air", cost: "156.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Delhivery", rating: "4.8", method: "Surface", cost: "134.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Blue Dart", rating: "4.5", method: "Air", cost: "156.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Delhivery", rating: "4.8", method: "Surface", cost: "134.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Blue Dart", rating: "4.5", method: "Air", cost: "156.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
];


const Action: React.FC<ActionProps> = ({ order, onBack }) => {

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
          className="relative w-[50vw] h-full bg-[#292b35] text-white overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
    <div className="container h-full w-[50vw] flex flex-col py-6 bg-[#292b35] text-white rounded-lg ">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white px-4">Order Details <h1>{order.ID}</h1></h1>
        <button className="text-gray-400 hover:text-white px-4" onClick={onBack}>
          <Cancel />
        </button>
      </div>

    <Divider className="bg-gray-200 w-full h-[1px] my-4"/>
    <div className="overflow-scroll scrollbar-hide">
  {/* Address Container */}
  <div className="address-container bg-[#292b35] p-6 rounded-lg mb-6">
    <h2 className="text-xl font-medium mb-4 text-gray-300">Select Courier</h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Pickup and Delivery */}
      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-2">Pickup From</label>
        <select className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300">
          <option value={''}>
            {``}
          </option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-2">Deliver To</label>
        <input
          type="text"
          value={''}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
          readOnly
        />
      </div>
    </div>

    {/* Order Value, Applied Weight, Dimensions */}
    <div className="grid grid-cols-5 gap-4 mt-6">
      <div className="flex flex-col col-span-2">
        <label className="text-gray-400 text-sm mb-2">Order Value</label>
        <input
          type="text"
          value={order?.TotalPrice || ""}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
          readOnly
        />
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 text-sm mb-2">Applied Weight</label>
        <input
          type="number"
          value={''}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
          readOnly
        />
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 text-sm mb-2">Length (CM)</label>
        <input
          type="number"
          value={''}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
        />
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 text-sm mb-2">Width (CM)</label>
        <input
          type="number"
          value={'order?.Dimensions?.Width || 0'}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
        />
      </div>
      <div className="flex flex-col col-span-1">
        <label className="text-gray-400 text-sm mb-2">Height (CM)</label>
        <input
          type="number"
          value={'order?.Dimensions?.Height || 0'}
          className="bg-[#12121256] p-5 rounded-xl border border-[#3d3d3d] text-gray-300"
        />
      </div>
    </div>

    {/* Volumetric Weight */}
    <div className="flex justify-end mt-4">
      <p className="text-gray-400 text-sm">Volumetric Weight:  kg</p>
    </div>
  </div>
    <div className="bg-[#22232a] p-5 pb-6">
        <h1 className='text-2xl py-2 my-4 '> 
            Courier Services Available 
        </h1>
    <div className="grid grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
    </div>
    </div>
    </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Action;
