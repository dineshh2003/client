"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import PermanentDrawerLeft from "@/components/SideBar";
import { Appbar } from "../../components/Appbar";
import IndexBar from "../../components/IndexBar";
import TrackBar from "../../components/TrackBar";
import OrderTableSkeleton from "../utils/OrderTableSkeleton";
import Action from "../../components/Action";
import Warehouse from "../../components/Warehouse";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

const StoreOrderTable = lazy(() => import("../../components/DataTable"));

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewOrder, setViewOrder] = useState<FirestoreOrder | null>(null);
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const key = "orders_quickstart-5091d5ef.myshopify.com";
  const [view, setView] = useState<'home' | 'warehouse'>('home');

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.refresh();
  //   }
  // }, [status, router]);

  //      // Render a loading state while checking the session or fetching data
  //  if (status === "loading" || loading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // if (session) {
  //   return <Typography variant="h4" color="error">Access Denied</Typography>;
  // }

    // Redirect if not authenticated


  // Fetch orders only when the session is valid
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/get-cached-orders?key=${key}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: FirestoreOrder[] = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
      fetchOrders();
  }, [fetchOrders]);

  // Render a loading state while checking the session or fetching dat



  const handleSelectOrder = (order: FirestoreOrder) => setViewOrder(order);
  const handleBackToOrders = () => setViewOrder(null);
  const handleSwitchView = (newView: 'home' | 'warehouse') => setView(newView);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      <PermanentDrawerLeft onSync={fetchOrders} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #42C195",
          borderBottom: "1px solid #42C195",
          overflow: "hidden",
          backgroundColor: "#121212",
          borderRadius: "45px",
          position: "relative",
          filter: viewOrder || view === 'warehouse' ? "blur(8px)" : "none",
          paddingX: "4px",
        }}
      >
        <Appbar setView={handleSwitchView} />
        <IndexBar />
        <TrackBar onSync={fetchOrders} />

        <Suspense fallback={<OrderTableSkeleton />}>
          <StoreOrderTable
            orders={orders}
            loading={loading}
            onSelectOrder={handleSelectOrder}
            />
          </Suspense>
      </Box>

      {/* Warehouse View */}
      <AnimatePresence>
        {view === 'warehouse' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "80vw",
              backgroundColor: "#292b35",
              zIndex: 10,
              padding: "1rem",
              borderLeft: "1px solid #42C195",
            }}
          >
            <Warehouse />
          </motion.div>
        )}

        {/* Order Details View */}
        {viewOrder && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "52vw",
              backgroundColor: "#292b35",
              zIndex: 10,
              padding: "1rem",
              borderLeft: "1px solid #42C195",
            }}
          >
            <Action order={viewOrder} onBack={handleBackToOrders} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default OrdersPage;
