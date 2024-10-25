

import { Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { AddIcon, HelpIcon, NightIcon, RestartIcon, SettingIcon, WalletIcon } from '../utils/Icons';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import SettingApp from '../utils/SettingButton';
interface AppbarProps {
  setView: (view: 'home' | 'warehouse') => void;
}

export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
  return (
    <div className='w-auto bg-[#121212]'>
      <AppBar
        sx={{
          width: `calc(100%)`, 
          ml: `300px`,
          bgcolor: '#121212',
          padding: '0.2rem 1rem',
          borderTop: '1px solid #42C195',
          borderRadius: '45px',
          overflow: 'hidden',
          position: 'absolute'
        }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side buttons */}
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#42C195',
                color: '#fff',
                height: '48px',
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '15px',
                padding: '0.5rem 1.5rem',
                '&:hover': { backgroundColor: '#38B583' }
              }}
              startIcon={<AddIcon />}
            >
              Create Order
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#42C195',
                color: '#fff',
                height: '48px',
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '15px',
                padding: '0.5rem 1.5rem',
                '&:hover': { backgroundColor: '#38B583' },
                display: 'flex',
                gap: '12px',
              }}
              startIcon={<WalletIcon />}
            >
              <h1>$1718.20</h1>
              <RestartIcon />
            </Button>
          </Box>

          {/* Right side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconButton sx={{ color: '#50C878' }}>
              <SettingApp setView={setView} /> {/* Pass setView here */}
            </IconButton>
            <IconButton sx={{ color: '#50C878' }}>
              <HelpIcon />
            </IconButton>
            <IconButton sx={{ color: '#50C878' }}>
              <NightIcon />
            </IconButton>

            {/* Conditional Account/User Button */}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
