"use client";

import React, { useState } from "react";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import Image from "next/image";
import { TodaysOrder } from "@/components/dashboard/Today-Order";
import { SndOrderSummary } from "@/components/dashboard/Send-Order";
import Analytics from "@/components/dashboard/Analytics";

const DashboardPage: React.FC = () => {
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

  return (
    <>
        <div className="mx-auto my-8 h-auto w-[90vw]  ">
          <div className="flex flex-col gap-5">
            {/* Welcome Section */}
            <div className="col-span-12 bg-gray-800 p-6 rounded-md shadow-md flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome, <span className="text-blue-500">Dinesh Jangid</span> 👋
                </h1>
                <p className="text-gray-400">Grow your business like a hero</p>
              </div>
              <Image src="/rocket.png" height={75} width={75} alt="Rocket" />
            </div>
            <SndOrderSummary date="06-12-2024" data={orderSummaryData} />
            <TodaysOrder date="06-12-2024" stats={orderStats} />
            <Analytics />
          </div>
        </div>
    </>
  );
};

export default DashboardPage;
