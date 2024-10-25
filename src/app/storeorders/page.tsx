"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import PermanentDrawerLeft from "@/app/components/SideBar";
import { Appbar } from "../components/Appbar";
import IndexBar from "../components/IndexBar";
import TrackBar from "../components/TrackBar";
import OrderTableSkeleton from "../utils/OrderTableSkeleton";
import Action from "../components/Action"; // Import Action component

const StoreOrderTable = lazy(() => import("../components/DataTable"));

const OrdersPage = () => {
  const [viewOrder, setViewOrder] = useState<FirestoreOrder | null>(null); // Track selected order
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const key = "orders_quickstart-5091d5ef.myshopify.com";
  const [view, setView] = useState<'home' | 'warehouse'>('home');
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/get-cached-orders?key=${key}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: FirestoreOrder[] = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSelectOrder = (order: FirestoreOrder) => {
    setViewOrder(order); // Set selected order
  };

  const handleBackToOrders = () => {
    setViewOrder(null); // Clear selected order and go back to orders
  };

  useEffect(() => {
    if (view === 'home') fetchOrders();
  }, [view, fetchOrders]);


  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      <PermanentDrawerLeft />
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
        }}
      >
        {viewOrder ? (
  <Action order={viewOrder} onBack={handleBackToOrders} /> // Pass a single order and onBack handler
) : (
  <Box
    sx={{
      paddingX: "1rem",
      flexGrow: 1,
      color: "#fff",
      overflowY: "auto",
      filter: viewOrder ? "blur(8px)" : "none",
    }}
  >
    <Appbar setView={setView} />
    <IndexBar />
    <TrackBar onSync={fetchOrders} />
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: 2,
      }}
    >
      <Typography variant="h4" component="h1" color="primary">
        User Orders
      </Typography>
      <Button variant="contained" onClick={fetchOrders} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Refresh Orders"}
      </Button>
    </Box>
    <Suspense fallback={<OrderTableSkeleton />}>
      <StoreOrderTable
        orders={orders}
        loading={loading}
        onSelectOrder={handleSelectOrder} // Select order to display in Action
      />
    </Suspense>
  </Box>
)}
        {viewOrder && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackToOrders}
            sx={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            Back to Orders
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
