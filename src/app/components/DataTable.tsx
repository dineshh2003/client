'use client';

import React, { useEffect, useState } from 'react';

// Order-related interfaces
interface TaxLine {
  title: string;
  price: string;
  rate: string;
}

interface LineItem {
  id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  price: string;
  total_discount: string;
  title: string;
  variant_title: string;
  vendor: string;
  taxable: boolean;
  tax_lines: TaxLine[];
}

interface Order {
  id: number;
  name: string;
  created_at: string;
  total_price: string;
  currency: string;
  financial_status: string;
  total_tax: string;
  line_items: LineItem[];
  customer: string;
  risk: string;
  buyerIntent: string;
}

// Component
export default function StoreOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const key = 'orders_quickstart-5091d5ef.myshopify.com'; // Update key accordingly

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/get-cached-orders?key=${key}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (err) {
      setError((err as Error).message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="card font-sans bg-[#1d1f27] rounded-lg p-4 mt-2">
      <div className="grid grid-cols-7 gap-4 text-left text-[#808080] bg-[#292b35] p-3 rounded-t-lg">
        <div>Order ID</div>
        <div>Risk</div>
        <div>Buyer Intent</div>
        <div>Customer</div>
        <div>Items</div>
        <div>Order Date</div>
        <div>Action</div>
      </div>
      <div className="grid grid-cols-7 gap-0 bg-[#282A2F] text-white overflow-auto scrollbar-none max-h-[750px]">
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <div className="p-3">{order.name}</div>
            <div className="p-3">{order.risk || 'Low'}</div>
            <div className="p-3">{order.buyerIntent || 'Normal'}</div>
            <div className="p-3">{order.customer || 'Unknown'}</div>
            <div className="p-3">{order.line_items.length}</div>
            <div className="p-3">
              {new Date(order.created_at).toLocaleString()}
            </div>
            <div className="p-3">
              <button className="bg-[#292b35] text-[#BE74BA] px-4 py-2 rounded-md">
                Action
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
