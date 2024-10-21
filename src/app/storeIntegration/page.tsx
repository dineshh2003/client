'use client'; // Ensure client-side rendering for form submission

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ShopFormPage: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (!storeName) {
      alert('Please enter a store name');
      return;
    }

    try {
      // Redirecting to the backend URL with the storeName as a query parameter
      const response = await fetch(
        `http://localhost:8080/shopify/auth?shop=${storeName}`
      );

      if (response.redirected) {
        // If backend redirects (like OAuth), follow the redirect
        router.push(response.url);
      } else {
        alert('Error: Store not found or incorrect response from backend.');
      }
    } catch (error) {
      console.error('Error during request:', error);
      alert('Failed to authenticate. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Register Your Store
        </h2>
        <div className="mb-4">
          <label
            htmlFor="store-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Store Name
          </label>
          <input
            type="text"
            id="store-name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your store name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Connect Store
        </button>
      </form>
    </div>
  );
};

export default ShopFormPage;

// chalo khana khane bhai bhot bhuk lagi hai abhi bass ho gaya yaar 
