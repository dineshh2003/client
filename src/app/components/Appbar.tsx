

import { Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { AddIcon , HelpIcon, NightIcon, RestartIcon, SettingIcon, WalletIcon } from '../utils/Icons';
import { Flare } from '@mui/icons-material';

export const Appbar = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: `calc(100% - 300px)`, 
        ml: `300px`,
        bgcolor: '#121212',
        padding: '0.5rem 1rem',
        borderTop: '1px solid #42C195', 
        // border: '1px solid #42C195', // Border color
          borderRadius: '45px', // Rounded corners
          overflow: 'hidden' // Ensures child elements respect the border radius
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#42C195', // Match the color
              color: '#fff', 
              height: '52px',
              fontSize : '1.3rem',
              textTransform: 'none',
              borderRadius: '15px', // Rounded corners
              padding: '0.5rem 1.5rem', // Padding to enlarge the button
              '&:hover': { backgroundColor: '#38B583' } // Darker shade on hover
            }}
            startIcon={<AddIcon />}
          >
            Create Order
          </Button>

          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#42C195', // Match the color
              color: '#fff', 
              height: '52px',
              FontSize : '1.3rem',
              textTransform: 'none',
              borderRadius: '15px', // Rounded corners
              padding: '0.5rem 1.5rem', // Padding to enlarge the button
              '&:hover': { backgroundColor: '#38B583' }, // Darker shade on hover
            display : 'flex',
            gap: '12px',
            }}
            startIcon={<WalletIcon />}
          >
            <h1>$1718.20</h1>
            <RestartIcon/>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton sx={{ color: '#50C878' }}>
            <SettingIcon />
          </IconButton>
          <IconButton sx={{ color: '#50C878' }}>
            <HelpIcon />
          </IconButton>
          <IconButton sx={{ color: '#50C878' }}>
            <NightIcon />
          </IconButton>
          <IconButton sx={{ color: '#50C878' }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
