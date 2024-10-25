import React, { useState, useEffect } from 'react';
import { Button, Box, AppBar, Toolbar, Divider, Typography } from '@mui/material';
import { SyncIcon } from '../utils/Icons';

const TrackBar = ({ onSync }: { onSync: () => void }) => {
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleRefresh = () => {
    onSync(); // Trigger the sync when clicking the button
    setLastSync(new Date()); // Update the last sync time
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
          <Box sx={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <button className='hover:text-[#42C195]'>Store Order</button>
            <button className='hover:text-[#42C195]'>Ready to Dispatch</button>
            <button className='hover:text-[#42C195]'>Manifest</button>
            <button className='hover:text-[#42C195]'>In Transit</button>
            <button className='hover:text-[#42C195]'>Delivered</button>
            <button className='hover:text-[#42C195]'>RTO</button>
            <button className='hover:text-[#42C195]'>All</button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography>
              Last sync: {lastSync ? formatTime(lastSync) : 'Not synced yet'}
            </Typography>
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
