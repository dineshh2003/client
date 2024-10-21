'use client';

import React, { useState, useEffect } from 'react';

interface StoreOrdersPageProps {
  storeName: string;
  token: string;
}

const StoreOrdersPage: React.FC<StoreOrdersPageProps> = ({ storeName, token }) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      // Log initial variables
      console.log('Attempting to fetch orders...');
      console.log('Store Name:', storeName);
      console.log('Token:', token);

      try {
        const url = `http://localhost:8080/shopify/order?store=${storeName}&token=${token}`;
        console.log('Constructed URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Log response status
        console.log('Response Status:', response.status);

        if (!response.ok) {
          // Log response details in case of an error
          const errorText = await response.text();
          console.log('Response Error Text:', errorText);
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Orders fetched successfully:', data);
        setOrders(data); // Assuming data is the list of orders
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (storeName && token) {
      fetchOrders();
    } else {
      console.warn('Store name or token is missing');
    }
  }, [storeName, token]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2>Orders for {storeName}</h2>
      {orders ? (
        <pre>{JSON.stringify(orders, null, 2)}</pre> 
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default StoreOrdersPage;
