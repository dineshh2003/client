"use client"

import { Button, Box, Toolbar, IconButton } from '@mui/material';
import { AddIcon, HelpIcon, NightIcon, RestartIcon, SettingIcon, WalletIcon } from '../utils/Icons';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import SettingApp from '../utils/SettingButton';
import Warehouse from '../components/Warehouse';
import PermanentDrawerLeft from '@/app/components/SideBar';
import IndexBar from '@/app/components/IndexBar';
import TrackBar from '@/app/components/TrackBar';
import ModifyBar from '@/app/components/ModifyBar';
import StoreOrderPage from '../components/DataTable';
import React, { useState, useEffect } from 'react';
import { DropdownItem } from '@nextui-org/react';
import { Appbar } from '../components/Appbar';
import {Order} from '../utils/ordersInterface'


const Page: React.FC = () => {
  const [view, setView] = useState<'home' | 'warehouse'>('home'); // Manage which view is active
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const key = 'orders_quickstart-5091d5ef.myshopify.com';

  const fetchOrders = async () => {
    try {
      setLoading(true);
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

  const handleSync = () => {
    window.location.href = "/api/shopify/auth?shop=quickstart-5091d5ef.myshopify.com";
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#121212' }}>
      <PermanentDrawerLeft />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #42C195',
          borderBottom: '1px solid #42C195',
          overflow: 'hidden',
          backgroundColor: '#121212',
          borderRadius: '45px',
        }}
      >
        <Box sx={{ paddingX: '1rem', flexGrow: 1, backgroundColor: '#121212', color: '#fff', overflowY: 'auto' }}>
        <Appbar setView={setView} />


          {/* Conditionally render components based on the view state */}
          {view === 'home' && (
            <>
              <IndexBar />
              <TrackBar onSync={handleSync} />
              {/* <ModifyBar /> */}
              {loading ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <StoreOrderPage orders={orders} />
              )}
            </>
          )}

          {view === 'warehouse' && <Warehouse />}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
