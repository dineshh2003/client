"use client"

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
import { AssignmentReturnIcon, HomeIcon, LocalShippingIcon, MailIcon, StoreIcon } from '../utils/Icons';

const drawerWidth = 300;

export default function PermanentDrawerLeft() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
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
                    //   border: '1px solid #42C195', // Add a border at the bottom
        //   borderBottomLeftRadius: '16px', // Adjust the radius as needed
        //   borderBottomRightRadius: '16px', // Adjust the radius as needed
        //   borderBottom : '0px solid #42c195',
        //   padding: '0.5rem 2rem',
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
                  color: selectedIndex === index ? '#50C878' : '#f5f5f5', // Text color changes to green if selected
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
