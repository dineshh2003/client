"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import PermanentDrawerLeft from "@/app/components/SideBar";
import { Appbar } from "../components/Appbar";
import IndexBar from "../components/IndexBar";
import TrackBar from "../components/TrackBar";
import OrderTableSkeleton from "../utils/OrderTableSkeleton";

const StoreOrderPage = lazy(() => import("../components/DataTable"));

const OrdersPage = () => {
  const [view, setView] = useState<"home" | "warehouse">("home");
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const key = "orders_quickstart-5091d5ef.myshopify.com";

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/get-cached-orders?key=${key}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: FirestoreOrder[] = await response.json();

      // Map the keys to match component expectations
      const mappedData = data.map(order => ({
        ...order,
        CreatedAt: order.CreatedAt,  // map CreatedAt to createdAt
        UpdatedAt: order.UpdatedAt,  // map UpdatedAt to updatedAt // map ProcessedAt to processedAt
      }));

      setOrders(mappedData);

      console.log(mappedData);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    if (view === "home") fetchOrders();
  }, [view, fetchOrders]);

  const handleSync = useCallback(() => {
    setLoading(true);
    window.location.href = `/api/shopify/auth?shop=${key}`;
  }, [key]);

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
        }}
      >
        <Box sx={{ paddingX: "1rem", flexGrow: 1, color: "#fff", overflowY: "auto" }}>
          <Appbar setView={setView} />
          <IndexBar />
          <TrackBar onSync={handleSync} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
            <Typography variant="h4" component="h1" color="primary">
              User Orders
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchOrders} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Refresh Orders"}
            </Button>
          </Box>

          <Suspense fallback={<OrderTableSkeleton />}>
            {loading ? (
              <OrderTableSkeleton />
            ) : error ? (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            ) : (
              <StoreOrderPage orders={orders} loading={loading} />
            )}
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersPage;
