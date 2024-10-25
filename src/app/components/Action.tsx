import React from "react";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import { Cancel } from "@mui/icons-material";
import SplitButton from "../utils/ButtonGrp";
import CompanyCard from "./CompanyCard";

interface ActionProps {
  order: FirestoreOrder;
  onBack: () => void;
}

const companies = [
  { name: "Delhivery", rating: "4.8", method: "Surface", cost: "134.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
  { name: "Blue Dart", rating: "4.5", method: "Air", cost: "156.10", estDelivery: "13 Oct, 2024", pickup: "Tomorrow", weight: "4-5 days" },
];

const Action: React.FC<ActionProps> = ({ order , onBack }) => {
  return (
    <div className="container bg-[#292b35] flex flex-row h-[90vh] w-[80vw] px-8 border-2 rounded-xl border-[#42C195]">
      <button className="flex justify-end rounded-full text-gray-400" onClick={onBack}>
        <Cancel />
      </button>

      <div className="container">
        <h1 className="text-4xl font-thin text-[#42C195]">Order Details</h1>
        <p>Order ID: {order.ID}</p>
        <p>Total Price: {order.TotalPrice}</p>
        <p>Shipping To: {order.ShippingAddress?.address1}</p>

        <div className="Companies-Name grid grid-cols-3 gap-4 mt-8">
          {companies.map((company, index) => (
            <CompanyCard key={index} {...company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Action;
