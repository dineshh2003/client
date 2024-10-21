'use client';

import React, { useState } from 'react';

interface StoreIntegrationPageProps {
  onSuccess: (storeName: string, token: string) => void;
}

const StoreIntegrationPage: React.FC<StoreIntegrationPageProps> = ({ onSuccess }) => {
  const [storeName, setStoreName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeName) {
      alert('Please enter a store name');
      return;
    }

    try {
      // Redirect to the backend which handles Shopify authentication
      const response = await fetch(`http://localhost:8080/shopify/auth?shop=${storeName}`);

      if (response.ok) {
        const { redirect_url } = await response.json(); // Get the redirect URL from the backend
        console.log(redirect_url)
        window.location.href = redirect_url; // Redirect the user to Shopify's OAuth page
        console.log('after redirect')
      } else {
        setErrorMessage('Error: Store not found or incorrect response from backend.');
      }
    } catch (error) {
      console.error('Error during request:', error);
      setErrorMessage('Failed to authenticate. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Register Your Store</h2>
        <div className="mb-4">
          <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Connect Store
        </button>
      </form>
    </div>
  );
};

export default StoreIntegrationPage;
