"use client";

import { Package, Truck, ArrowRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { type OrderStats } from "../types/order";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TodaysOrderProps {
  date: string;
  stats: OrderStats;
  theme?: string;
}

export function TodaysOrder({ date, stats, theme }: TodaysOrderProps) {
  const statCards = [
    { icon: Package, label: "Pickup", value: stats.pickup },
    { icon: Truck, label: "In Transit", value: stats.inTransit },
    { icon: ArrowRight, label: "OFD", value: stats.ofd },
    { icon: CheckCircle, label: "Delivered", value: stats.delivered },
    { icon: XCircle, label: "Undelivered", value: stats.undelivered },
    { icon: RotateCcw, label: "RTO", value: stats.rto },
  ];

  return (
    <div className={cn(
      "rounded-lg p-6 shadow-lg border transition-all duration-300",
      theme === "dark"
        ? "bg-[#111827] border-gray-800"
        : "bg-white border-gray-200"
    )}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className={cn(
          "text-xl font-semibold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Today&apos;s Order
        </h2>
        <div className={cn(
          "rounded px-4 py-2 border transition-colors duration-300",
          theme === "dark"
            ? "bg-[#1e293b] border-gray-700 text-white"
            : "bg-gray-50 border-gray-200 text-gray-900"
        )}>
          Date: {date}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex flex-col items-center rounded-lg p-4 border transition-all duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-800 hover:border-[#42C195]"
                : "bg-gray-50 border-gray-200 hover:border-[#2C7A7B]"
            )}
          >
            <card.icon className={cn(
              "mb-2 h-6 w-6",
              theme === "dark" ? "text-[#42C195]" : "text-[#2C7A7B]"
            )} />
            <span className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              {card.label}
            </span>
            <span className={cn(
              "text-2xl font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              {card.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

