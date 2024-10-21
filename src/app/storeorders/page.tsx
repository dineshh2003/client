'use client';

import React, { useState, useEffect } from 'react';
import PermanentDrawerLeft from '@/app/components/SideBar';
import { Appbar } from '@/app/components/Appbar';
import IndexBar from '@/app/components/IndexBar';
import { Box } from '@mui/material'; 
import TrackBar from '@/app/components/TrackBar';
import ModifyBar from '@/app/components/ModifyBar';
import StoreIntegrationPage from '../components/StoreIntegration';
import StoreOrdersPage from '../components/DataTable';

const Page: React.FC = () => {
  const [isStoreIntegrated, setIsStoreIntegrated] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  // Fetch shopName and token from the backend directly
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/shopify/auth?shop=${storeName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Store Data:', data);
          setStoreName(data.shop);
          setToken(data.token);
          setIsStoreIntegrated(true);
        } else {
          setError('Authentication failed. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching store data:', err);
        setError('Failed to fetch store data. Please try again.');
      }
    };

    fetchStoreData();
  }, []);


  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
      <PermanentDrawerLeft />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', border: '1px solid #42C195', borderRadius: '45px', overflow: 'hidden' }}>
        <Appbar />
        <Box sx={{ padding: '1rem', flexGrow: 1, backgroundColor: '#121212', color: '#fff', mt: '4.5rem' }}>
          <IndexBar /> 
          <TrackBar />
          <ModifyBar />
          {isStoreIntegrated ? (
            <StoreOrdersPage storeName={storeName} token={token} />
          ) : (
            <>
              {error ? <p className="text-red-500">{error}</p> : <StoreIntegrationPage onSuccess={() => {}} />}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
