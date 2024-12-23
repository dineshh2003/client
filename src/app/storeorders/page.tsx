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
import { useRouter, useSearchParams } from "next/navigation";
import { gql, useMutation } from "@apollo/client";

const StoreOrderTable = lazy(() => import("../../components/DataTable"));

const EXCHANGE_ACCESS_TOKEN_MUTATION = gql`
  mutation ExchangeAccessToken($shopName: String!, $code: String!, $accountId: String!) {
    exchangeAccessToken(shopName: $shopName, code: $code, accountId: $accountId)
  }
`;

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewOrder, setViewOrder] = useState<FirestoreOrder | null>(null);
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [exchangeAccessToken] = useMutation(EXCHANGE_ACCESS_TOKEN_MUTATION);
  const key = "orders_quickstart-5091d5ef.myshopify.com";
  const [view, setView] = useState<'home' | 'warehouse'>('home');

  // Extract code and shop from URL
  useEffect(() => {
    console.log("Extracting query parameters...");
    const extractedCode = searchParams.get("code");
    const extractedShop = searchParams.get("shop");

    if (extractedCode && extractedShop) {
      console.log(`Code: ${extractedCode}, Shop: ${extractedShop}`);
      setCode(extractedCode);
      setShopName(extractedShop);
    } else {
      console.error("Missing code or shop in the URL parameters.");
    }
  }, [searchParams]);

  // Exchange access token after extracting code and shop name
  useEffect(() => {
    if (code && shopName) {
      console.log("Exchanging access token...");
      const accountId = "accountId456"; // Replace with the appropriate account ID logic

      exchangeAccessToken({
        variables: { shopName, code, accountId },
      })
        .then((response) => {
          console.log("Access token exchanged successfully:", response.data);
          // Redirect or perform further actions after successful token exchange
        })
        .catch((error) => {
          console.error("Error exchanging access token:", error);
        });
    } else {
      if (!code) console.error("Code is not available.");
      if (!shopName) console.error("Shop name is not set.");
    }
  }, [code, shopName, exchangeAccessToken]);

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

  const handleSelectOrder = (order: FirestoreOrder) => setViewOrder(order);
  const handleBackToOrders = () => setViewOrder(null);
  const handleSwitchView = (newView: 'home' | 'warehouse') => setView(newView);

  return (
    <Box sx={{ display: "flex", height: "100vh" }} className='bg-slate-800'>
      <PermanentDrawerLeft onSync={fetchOrders} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          filter: viewOrder || view === 'warehouse' ? "blur(8px)" : "none",
        }}
      >
        <Appbar setView={handleSwitchView} />
        <div className="p-4">
          <IndexBar />
          <TrackBar onSync={fetchOrders} />
          <Suspense fallback={<OrderTableSkeleton />}>
            <StoreOrderTable
              accountId="accountId456"
              onSelectOrder={handleSelectOrder}
            />
          </Suspense>
        </div>
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
