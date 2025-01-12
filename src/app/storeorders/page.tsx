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
import { toast } from "sonner";

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
  const [view, setView] = useState<'home' | 'warehouse'>('home');

  // Check for authenticated session
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    console.log("Extracting query parameters...");
    const extractedCode = searchParams.get("code");
    const extractedShop = searchParams.get("shop");

    if (extractedCode && extractedShop) {
      console.log(`Code: ${extractedCode}, Shop: ${extractedShop}`);
      setCode(extractedCode);
      setShopName(extractedShop);
    } else {
      console.log("No code or shop parameters found in URL");
    }
  }, [searchParams]);

  useEffect(() => {
    const handleTokenExchange = async () => {
      if (!code || !shopName || !session?.user?.id) {
        return;
      }

      try {
        console.log("Exchanging access token...");
        const response = await exchangeAccessToken({
          variables: { 
            shopName, 
            code, 
            accountId: session.user.id 
          },
        });

        console.log("Access token exchanged successfully:", response.data);
        toast.success("Shop connected successfully!");
        
        // Clear URL parameters after successful exchange
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        
      } catch (error) {
        console.error("Error exchanging access token:", error);
        toast.error("Failed to connect shop. Please try again.");
      }
    };

    if (code && shopName && session?.user?.id) {
      handleTokenExchange();
    }
  }, [code, shopName, session?.user?.id, exchangeAccessToken]);

  const handleSelectOrder = (order: FirestoreOrder) => {
    setViewOrder(order);
  };

  // Don't render the main content until we have a session
  if (status === 'loading') {
    return <OrderTableSkeleton />;
  }

  if (!session?.user?.id) {
    return null; // Or a more appropriate loading state
  }

  return (
    <div className="p-4">
      <IndexBar />
      <TrackBar onSync={() => {
        // You can implement additional sync logic here if needed
        // The main sync functionality is now handled in the TrackBar component
      }} />
      <StoreOrderTable
        onSelectOrder={handleSelectOrder}
      />
    </div>
  );
};

export default OrdersPage;