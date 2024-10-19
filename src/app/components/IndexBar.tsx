

import React from 'react';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import { LoveIcon, ExportIcon, UploadIcon, BoxIcon, TruckLoadIcon } from '../utils/Icons';
import SplitButton from '../utils/ButtonGrp';

const IndexBar = () => {
  return (
    <AppBar 
      position="relative" // Ensures it's placed below the Appbar and not overlapping
      sx={{ 
        width: `calc(100% - 300px)`, 
        ml: `300px`,
        bgcolor: '#121212',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent : 'right' }}>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff', 
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px', // Rounded corners
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' }
            }}
            startIcon={<TruckLoadIcon />}
          >
            All Orders
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            startIcon={<LoveIcon />}
          >
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            startIcon={<ExportIcon />}
          >
            Export
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            startIcon={<UploadIcon />}
          >
            Bulk Upload
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff',
              height: '37px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' },
              display: 'flex',
              gap: '3px',
            }}
            startIcon={<BoxIcon />}
          >
            Bulk Update
          </Button>
         <SplitButton/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default IndexBar;
