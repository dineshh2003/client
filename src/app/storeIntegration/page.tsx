'use client';
import React from 'react';

const StoreIntegrationPage: React.FC = () => {
  const handleIntegrateStore = () => {
    // Redirect to backend route, which will handle Shopify OAuth flow
    window.location.href = '/api/shopify/auth?shop=quickstart-5091d5ef.myshopify.com';
  };

  return (
    <div>
      <h1>Integrate Your Store</h1>
      <button onClick={handleIntegrateStore}>
        Integrate Store with Shopify
      </button>
    </div>
  );
};

export default StoreIntegrationPage;
