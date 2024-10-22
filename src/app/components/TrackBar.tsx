import React from 'react';
import { Button, Box, AppBar, Toolbar, Divider } from '@mui/material';
import { SyncIcon } from '../utils/Icons';

const TrackBar = ({ onSync }: { onSync: () => void }) => {
  
  const handleRefresh = () => {
    onSync(); // Trigger the sync when clicking the button
  };

  return (
    <div className='font-poppins text-gray-400'> 
    <AppBar 
      position="relative"
      sx={{ 
        width: `calc(100%)`, 
        borderRadius: '18px 18px 0 0',
        bgcolor: '#282A2F',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent : 'space-between' ,  padding: '0.5rem 1rem' }}>
        <Box sx={{ display: 'flex', gap: '3rem', alignItems: 'center'}}>
          <button className='hover:text-[#42C195]'>
            store order
          </button>
          <button className='hover:text-[#42C195]'>
           Ready to Dispatch
          </button>
          <button className='hover:text-[#42C195]'>
            Manifest
          </button>
          <button className='hover:text-[#42C195]'>
            Intrasit
          </button>
          <button className='hover:text-[#42C195]'>
            Delivered
          </button>
          <button className='hover:text-[#42C195]'>
            RTO
          </button>
          <button className='hover:text-[#42C195]'>
            ALL
          </button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>Last sync: 20 seconds ago</h1>
          <button onClick={handleRefresh}>
            <SyncIcon />
          </button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
    </div>
  );
};

export default TrackBar;
