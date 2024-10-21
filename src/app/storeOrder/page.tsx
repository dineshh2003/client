'use client';

import { useEffect, useState } from 'react';

interface Money {
  amount: string;
  currency_code: string;
}

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
}

export default function StoreOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const key = "orders_quickstart-5091d5ef.myshopify.com"; // Use the appropriate key

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/get-cached-orders?key=${key}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Store Orders</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order {order.name}</h2>
              <p>ID: {order.id}</p>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
              <p>Total Price: {order.total_price} {order.currency}</p>
              <p>Status: {order.financial_status}</p>
              <h3>Line Items:</h3>
              <ul>
                {order.line_items.map((item) => (
                  <li key={item.id}>
                    {item.title} (x{item.quantity}) - {item.price} {order.currency}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
