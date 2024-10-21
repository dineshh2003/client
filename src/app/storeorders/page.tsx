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
  const [error, setError] = useState<string | null>(null);


  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
      <PermanentDrawerLeft />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', border: '1px solid #42C195', borderRadius: '45px' , position: ''}}>
        <Appbar />
        <Box sx={{ padding: '1rem', flexGrow: 1, backgroundColor: '#121212', color: '#fff', mt: '4.5rem' }}>
          <IndexBar /> 
          <TrackBar />
          <ModifyBar />
          {/* {isStoreIntegrated ? (
            <StoreOrdersPage/>
          ) : (
            <>
              {error ? <p className="text-red-500">{error}</p> : <StoreIntegrationPage onSuccess={() => {}} />}
            </>
          )} */}
          <StoreOrdersPage/>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
