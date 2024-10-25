"use client";
import { useEffect, useState } from "react";
import { FirestoreOrder } from "@/interfaces/OrderInterface";

// Define the OrdersPage component
const OrdersPage = () => {
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch orders from the backend API
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/get-cached-orders?key=orders_quickstart-5091d5ef.myshopify.com"
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data: FirestoreOrder[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle loading, error, or empty state
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard key={order.ID} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component to render individual order details
const OrderCard: React.FC<{ order: FirestoreOrder }> = ({ order }) => (
  <div className="order-card">
    <h2>Order ID: {order.ID}</h2>
    <p><strong>Name:</strong> {order.Name}</p>
    <p><strong>Email:</strong> {order.email ?? "Not Provided"}</p>
    <p>
      <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
    </p>
    <p>
      <strong>Processed At:</strong> {new Date(order.processedAt).toLocaleString()}
    </p>
    <p><strong>Total Price:</strong> {order.totalPrice} {order.currency}</p>
    <p><strong>Financial Status:</strong> {order.financialStatus}</p>

    {order.shippingAddress && (
      <div>
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress.address1}</p>
        {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.zip}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>
    )}
  </div>
);

export default OrdersPage;
