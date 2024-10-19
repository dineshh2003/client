"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AssignmentReturnIcon, HomeIcon, LocalShippingIcon, MailIcon, StoreIcon } from '../utils/Icons';

const drawerWidth = 300;

export default function PermanentDrawerLeft() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter(); // Initialize the router

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    
    // Navigate based on the selected index
    switch(index) {
      case 0: // Home
        router.push('/'); // Adjust the path as needed
        break;
      case 1: // Inbox
        router.push('/inbox'); // Adjust the path as needed
        break;
      case 2: // Store Order
        router.push('/storeorder'); // Adjust the path as needed
        break;
      case 3: // Delivered
        router.push('/delivered'); // Adjust the path as needed
        break;
      case 4: // Reverse Order
        router.push('/reverseorder'); // Adjust the path as needed
        break;
      case 5: // Store Integration
        router.push('/storeIntegration'); // Navigate to Store Integration
        break;
      case 6: // Billing
        router.push('/billing'); // Adjust the path as needed
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#121212', // Dark background color
            color: '#50C878', // Greenish text color
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ justifyContent: '', paddingTop: '1.8rem' }}>
          <Image src='/Group1.png' height={80} width={80} alt='Logo' />
        </Toolbar>
        <Divider sx={{ paddingTop: '3.5rem', borderColor: '#333333' }} />
        <List sx={{ flexGrow: 1, gap: '25px', display: 'flex', flexDirection: 'column', color: '#f5f5f5' , paddingLeft : '10px' }}>
          {[
            { text: 'Home', icon: <HomeIcon /> },
            { text: 'Inbox', icon: <MailIcon /> },
            { text: 'Store Order', icon: <StoreIcon /> },
            { text: 'Delivered', icon: <LocalShippingIcon /> },
            { text: 'Reverse Order', icon: <AssignmentReturnIcon /> },
            { text: 'Store Integration', icon: <AssignmentReturnIcon /> },
            { text: 'Billing', icon: <PaymentIcon /> },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                  color: selectedIndex === index ? '#50C878' : '#f5f5f5',
                  fontFamily: 'sans-serif',
                }}
              >
                <ListItemIcon sx={{ color: selectedIndex === index ? '#50C878' : '#f5f5f5' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Custom User Toolbar at the Bottom */}
        <Toolbar sx={{ justifyContent: 'center', marginTop: 'auto', paddingBottom: '1.8rem' }}>
          <button>
            <Image src='/User.png' height={40} width={40} alt='User' />
          </button>
        </Toolbar>
      </Drawer>
    </Box>
  );
}
