"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import IndexBar from "../../components/IndexBar";
import TrackBar from "../../components/TrackBar";
import OrderTableSkeleton from "../../utils/OrderTableSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import dynamic from 'next/dynamic';

const StoreOrderTable = dynamic(() => import("../../components/DataTable"), {
  ssr: false,
  loading: () => <OrderTableSkeleton />
});

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

  const handleSelectOrder = (order: FirestoreOrder) => {
    setViewOrder(order);
  };

  return (
    <div className="p-4">
      <IndexBar />
      <TrackBar onSync={() => {
        // Implement your sync logic here
        // For example, refetching orders or updating data
      }} />
      <StoreOrderTable
        accountId="accountId456"
        onSelectOrder={handleSelectOrder}
      />
    </div>
  );
};

export default OrdersPage;

