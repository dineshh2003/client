

import React from 'react';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import { SearchIcon , CalenderIcon , CentralizedNetworkIcon, FilterIcon, Storeicon} from '../app/utils/Icons';
import SplitButton from '../app/utils/ButtonGrp';

const ModifyBar = () => {
  return (
    <AppBar 
      position="relative" // Ensures it's placed below the Appbar and not overlapping
      sx={{ 
        width: '100%',
        // Matches the lower border of TrackBar
        bgcolor: '#282A2F', // Matches the lower border
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent : 'Left ' }}>
        {/* <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
            startIcon={<SearchIcon />}
          >
            <textarea name="" id="" className='h-8 px-3 justify-center items-center bg-inherit'  placeholder='Seach by Id'/>
          </Button>
        </Box> */}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff', 
              height: '40px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px', // Rounded corners
              padding: '0.5rem 1.5rem',
              '&:hover': { color : '#38B583' }
            }}
            startIcon={<SearchIcon />}
          >
            <textarea name="" id="" className='h-8 px-3 justify-center items-center bg-inherit '  placeholder='Seach by Id'/>
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff', 
              height: '40px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px', // Rounded corners
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' }
            }}
            startIcon={<CalenderIcon />}
          >
            <textarea name="" id="" className='h-8 px-3 justify-center items-center bg-inherit'  placeholder='06-10-24 - 08-10..'/>
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#121212',
              color: '#fff', 
              height: '40px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '10px', // Rounded corners
              padding: '0.5rem 1.5rem',
              '&:hover': { backgroundColor: '#38B583' }
            }}
            startIcon={<FilterIcon/>}
          >
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ModifyBar;
