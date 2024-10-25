import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Box, AppBar, Toolbar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FlightIcon from '@mui/icons-material/Flight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaymentIcon from '@mui/icons-material/Payment';
import { HomeIcon, MailIcon, AssignmentReturnIcon } from '../utils/Icons';
import AuthButtons from './Authbutton';

const drawerWidth = 300;
const bgColor = '#121212'; // Dark background for drawer
const selectedColor = '#50C878'; // Greenish text for selected item
const hoverColor = '#333333'; // Hover background color

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, route: '/' },
  { text: 'Inbox', icon: <MailIcon />, route: '/inbox' },
  { text: 'Store Order', icon: <StoreIcon />, route: '/storeorder' },
  { text: 'Delivered', icon: <LocalShippingIcon />, route: '/delivered' },
  { text: 'Reverse Order', icon: <AssignmentReturnIcon />, route: '/reverseorder' },
  { text: 'Store Integration', icon: <AssignmentReturnIcon />, route: '/storeIntegration' },
  { text: 'Billing', icon: <PaymentIcon />, route: '/billing' },
];

interface TrackBarProps {
  onSync: () => void;
}

const TrackBar: React.FC<TrackBarProps> = ({ onSync }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    router.push(route);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarExpanded ? drawerWidth : 80,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: isSidebarExpanded ? drawerWidth : 60,
            overflow: 'hidden',
            backgroundColor: bgColor,
            color: '#f5f5f5',
            transition: 'width 0.3s ease',
          },
        }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <Toolbar sx={{ justifyContent: 'center', padding: '1.8rem' }}>
          <Image src='/Group1.png' height={80} width={80} alt='Logo' />
        </Toolbar>
        <Divider sx={{ borderColor: hoverColor }} />

        <List sx={{ flexGrow: 1, color: '#f5f5f5', paddingLeft: '10px' }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{gap:'16px'}}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index, item.route)}
                sx={{
                  '&:hover': { backgroundColor: hoverColor },
                  color: selectedIndex === index ? selectedColor : '#f5f5f5',
                  fontFamily: 'sans-serif',
                }}
              >
                <ListItemIcon sx={{ color: selectedIndex === index ? selectedColor : '#f5f5f5' }}>
                  {item.icon}
                </ListItemIcon>
                {isSidebarExpanded && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <Toolbar sx={{ justifyContent: 'center', marginTop: 'auto', paddingBottom: '1.8rem' }}>
          <AuthButtons />
        </Toolbar>
      </Drawer>
    </Box>
  );
};

export default TrackBar;
