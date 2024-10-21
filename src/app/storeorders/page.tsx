'use client';
import React, { useState } from 'react';
import PermanentDrawerLeft from '@/app/components/SideBar';
import { Appbar } from '@/app/components/Appbar';
import IndexBar from '@/app/components/IndexBar';
import { Box } from '@mui/material';
import TrackBar from '@/app/components/TrackBar';
import ModifyBar from '@/app/components/ModifyBar';
import StoreOrdersPage from '../components/DataTable';

const Page: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow:'hidden' , backgroundColor: '#121212',  }}>
      <PermanentDrawerLeft />
      <Box sx={{ flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #42C195',  // Left side border
    borderBottom: '1px solid #42C195', // Bottom side border
    overflow: 'hidden',
    backgroundColor: '#121212',
    borderRadius: '45px' }}>
        <Box sx={{ paddingX : '1rem', flexGrow: 1, backgroundColor: '#121212', color: '#fff', overflowY: 'auto' }}>
          <Appbar />
          <IndexBar />
          <TrackBar />
          <ModifyBar />
          <StoreOrdersPage />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
