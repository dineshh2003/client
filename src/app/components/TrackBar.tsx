

import React from 'react';
import { Button, Box, AppBar, Toolbar, Divider } from '@mui/material';
import { LoveIcon, ExportIcon, UploadIcon, BoxIcon, TruckLoadIcon, SyncIcon } from '../utils/Icons';
import SplitButton from '../utils/ButtonGrp';
import Image from 'next/image';
Image

const TrackBar = () => {
  return (
    <AppBar 
      position="relative" // Ensures it's placed below the Appbar and not overlapping
      sx={{ 
        width: `calc(100%)`, 
        // ml: `300px`,
        borderRadius: '18px 18px 0 0',
        bgcolor: '#282A2F',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent : 'space-between' ,  padding: '0.5rem 1rem'  }}>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff', 
              height: '37px',
              fontSize: '1rem',
              
              textTransform: 'none',
            //   borderRadius: '10px', // Rounded corners
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' }
            }}
          >
           Store Order
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
          >
            Ready to Despatch
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
          >
            Manifest
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
         
          >
Intransit          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            
          >
            Delivered
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            
          >
            RTO
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#282A2F',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
            //   borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            
          >
            All
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1>Last sync : 20 seconds ago</h1>
        <SyncIcon/>
        </Box>
      </Toolbar>
      <Divider/>
      {/* <Image src='/Line.png' height={5} width={100} alt=''/> */}
    </AppBar>
  );
}

export default TrackBar;
