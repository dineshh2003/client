"use client";

import React, { useState } from "react";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import Image from "next/image";
import { TodaysOrder } from "@/components/dashboard/Today-Order";
import { SndOrderSummary } from "@/components/dashboard/Send-Order";
import Analytics from "@/components/dashboard/Analytics";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { CODRemittance } from "@/components/dashboard/CodRemittance";
import { DailyShipments } from "@/components/dashboard/DailyShipment";
import { ManifestToPickup } from "@/components/dashboard/ManifestPickup";
import { NotDispatched } from "@/components/dashboard/NotDispatched";
import { OFDSummary } from "@/components/dashboard/OfdSummary";

const DashboardPage: React.FC = () => {
  const { theme } = useTheme();
  const [viewOrder, setViewOrder] = useState<FirestoreOrder | null>(null);
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'warehouse'>('home');

  const orderSummaryData = [
    { status: "Pickup", prepaid: 0, cod: 145, total: 145 },
    { status: "InTransit", prepaid: 1, cod: 3, total: 4 },
    { status: "Delivered", prepaid: 0, cod: 0, total: 0 },
    { status: "Lost", prepaid: 0, cod: 0, total: 0 },
    { status: "Out For Delivery", prepaid: 0, cod: 0, total: 0 },
    { status: "Undelivered", prepaid: 0, cod: 0, total: 0 },
    { status: "RTO", prepaid: 0, cod: 0, total: 0 },
    { status: "Others", prepaid: 0, cod: 0, total: 0 },
  ];

  const orderStats = {
    pickup: 145,
    inTransit: 302,
    ofd: 48,
    delivered: 46,
    undelivered: 166,
    rto: 44,
  };

  // Sample data for CODRemittance
  const codRemittanceData = {
    remittedAmount: "1,000,000",
    unremittedAmount: "500,000",
    billDue: "50,000",
    avgShippingCost: "100",
  };

  // Sample data for DailyShipments
  const dailyShipmentsData = [
    {
      date: "2023-07-01",
      newOrder: 100,
      pickup: 80,
      inTransit: 70,
      ofd: 60,
      delivered: 50,
      undelivered: 10,
      rto: 5,
      other: 5,
    },
    // Add more sample data as needed
  ];

  // Sample data for ManifestToPickup
  const manifestToPickupData = {
    totalOrders: "1,000",
    data: [
      { day: 1, days: "Day", count: 100 },
      { day: 2, days: "Days", count: 200 },
      { day: 3, days: "Days", count: 300 },
      { day: 4, days: "Days", count: 200 },
      { day: 5, days: "Days", count: 100 },
      { day: 6, days: "Days", count: 50 },
      { day: 7, days: "6+ Days", count: 50 },
    ],
  };

  // Sample data for NotDispatched
  const notDispatchedData = {
    totalOrders: "328",
    incorrectAddress: 328,
    duplicateOrder: 0,
  };

  // Sample data for OFDSummary
  const ofdSummaryData = {
    totalOrders: "1,659",
    data: [
      { day: 1, percentage: 53.1, orders: 589 },
      { day: 2, percentage: 35.3, orders: 83 },
      { day: 3, percentage: 8, orders: 17 },
      { day: 4, percentage: 5.7, orders: 8 },
    ],
  };

  return (
    <div className={cn(
      "transition-all duration-300 p-6 min-h-screen",
      theme === "dark"
        ? "bg-[#1e293b] text-gray-100"
        : "bg-gray-100 text-gray-900"
    )}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Welcome Section */}
        <div className={cn(
          "rounded-lg p-6 shadow-lg border transition-all duration-300",
          theme === "dark"
            ? "bg-[#111827] border-gray-800"
            : "bg-white border-gray-200"
        )}>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className={cn(
                "text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Welcome, <span className="text-[#42C195]">Dinesh Jangid</span> 👋
              </h1>
              <p className={cn(
                "transition-colors duration-300",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Grow your business like a hero
              </p>
            </div>
            <Image 
              src="/rocket.png" 
              height={75} 
              width={75} 
              alt="Rocket"
              className="animate-bounce" 
            />
          </div>
        </div>

        {/* Dashboard Components */}
        <div className="grid gap-6">
          <SndOrderSummary date="06-12-2024" data={orderSummaryData} theme={theme} />
          <TodaysOrder date="06-12-2024" stats={orderStats} theme={theme} />
          <Analytics theme={theme} />
          <CODRemittance
            remittedAmount={codRemittanceData.remittedAmount}
            unremittedAmount={codRemittanceData.unremittedAmount}
            billDue={codRemittanceData.billDue}
            avgShippingCost={codRemittanceData.avgShippingCost}
            theme={theme}
          />
          <DailyShipments data={dailyShipmentsData} theme={theme} />
          <ManifestToPickup
            totalOrders={manifestToPickupData.totalOrders}
            data={manifestToPickupData.data}
            theme={theme}
          />
          <NotDispatched
            totalOrders={notDispatchedData.totalOrders}
            incorrectAddress={notDispatchedData.incorrectAddress}
            duplicateOrder={notDispatchedData.duplicateOrder}
            theme={theme}
          />
          <OFDSummary
            totalOrders={ofdSummaryData.totalOrders}
            data={ofdSummaryData.data}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

