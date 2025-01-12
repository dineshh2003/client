// "use client";

// import { useState, useEffect } from "react";
// import React from "react";
// import Image from "next/image";
// import { signOut } from "next-auth/react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import LogoutIcon from "@mui/icons-material/Logout";
// import SettingApp from "./SettingApp";
// import { toast } from "sonner";
// import RechargeWalletModal from "./RechargeWalletModal";
// import { useQuery } from "@apollo/client";
// import { gql } from "@apollo/client";
// import { useRouter } from "next/navigation";
// import { useTheme } from "next-themes"; // Import for theme toggle functionality

// interface AppbarProps {
//   setView: (view: "home" | "warehouse" | "AddWarehouse") => void;
// }

// const GET_WALLET_DETAILS = gql`
//   query GetWalletDetails($input: GetWalletDetailsInput!) {
//     getWalletDetails(input: $input) {
//       walletDetails {
//         accountId
//         balance
//         currency
//         status
//         lastUpdated
//       }
//       errors {
//         code
//         message
//       }
//     }
//   }
// `;

// export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
//   const { theme, setTheme } = useTheme(); // Theme hook for toggling
//   const handleSignOut = async () => {
//     try {
//       await signOut({
//         callbackUrl: "/login",
//         redirect: true,
//       });
//       toast.success("Signed out successfully");
//     } catch (error) {
//       toast.error("Failed to sign out");
//       console.error("Sign out error:", error);
//     }
//   };

//   const [open, setOpen] = useState(false);
//   const [walletDetails, setWalletDetails] = useState<any>(null);
//   const router = useRouter();
//   const accountId = "1"; // Replace with dynamic account ID if available

//   const { data, loading, error, refetch } = useQuery(GET_WALLET_DETAILS, {
//     variables: { input: { accountId } },
//     fetchPolicy: "cache-and-network",
//   });

//   useEffect(() => {
//     if (data?.getWalletDetails?.walletDetails) {
//       setWalletDetails(data.getWalletDetails.walletDetails);
//     }
//   }, [data]);

//   const refreshWalletDetails = async () => {
//     try {
//       const { data: updatedData } = await refetch();
//       if (updatedData?.getWalletDetails?.walletDetails) {
//         setWalletDetails(updatedData.getWalletDetails.walletDetails);
//       }
//     } catch (err) {
//       console.error("Error fetching wallet details:", err);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     refreshWalletDetails();
//   };

//   const navigateToCreateOrder = () => {
//     router.push("/createorder");
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         backgroundColor: "#111827",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
//         {/* Logo Section */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Image
//             src="/rocket.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />

//           {/* Center Section */}
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={navigateToCreateOrder}
//               sx={{
//                 backgroundColor: "#42C195",
//                 color: "white",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#38B583" },
//               }}
//             >
//               Create Order
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<AccountBalanceWalletIcon />}
//               onClick={handleOpen}
//               sx={{
//                 backgroundColor: "#42C195",
//                 color: "white",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#38B583" },
//               }}
//             >
//               Recharge Wallet
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<AccountBalanceWalletIcon />}
//               endIcon={<RefreshIcon onClick={refreshWalletDetails} />}
//               sx={{
//                 backgroundColor: "#50C878",
//                 color: "white",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#45B36B" },
//               }}
//             >
//               {loading ? "Loading..." : walletDetails ? `$${walletDetails.balance}` : "N/A"}
//             </Button>
//           </Box>
//         </Box>

//         {/* Right Section */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <SettingApp setView={setView} />
//           <Tooltip title="Help">
//             <IconButton color="primary">
//               <HelpOutlineIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
//             <IconButton
//               color="primary"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Sign Out">
//             <IconButton color="error" onClick={handleSignOut}>
//               <LogoutIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Toolbar>

//       {/* Recharge Wallet Modal */}
//       <RechargeWalletModal open={open} handleClose={handleClose} />
//     </AppBar>
//   );
// };



"use client";


import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
// import SettingsIcon from '@mui/icons-material/Settings';
import { SettingIcon } from '@/utils/Icons';
import { cn } from "@/lib/utils";
// import SettingApp from '@/utils/SettingButton';
import RechargeWalletModal from './RechargeWalletModal';
import { set } from 'date-fns';
import SettingApp from './SettingApp';


const GET_WALLET_DETAILS = gql`
  query GetWalletDetails($input: GetWalletDetailsInput!) {
    getWalletDetails(input: $input) {
      walletDetails {
        accountId
        balance
        currency
        status
        lastUpdated
      }
      errors {
        code
        message
      }
    }
  }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#FFFFFF',
  color: theme.palette.mode === 'dark' ? '#F9FAFB' : '#111827',
  transition: 'background-color 0.3s, color 0.3s',
  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 193, 149, 0.1)' : 'rgba(0, 0, 0, 0.04)',
  color: theme.palette.mode === 'dark' ? '#F9FAFB' : '#111827',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 193, 149, 0.2)' : 'rgba(0, 0, 0, 0.08)',
  },
}));

const WalletButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 193, 149, 0.2)' : theme.palette.primary.main,
  color: theme.palette.mode === 'dark' ? '#42C195' : theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 193, 149, 0.3)' : theme.palette.primary.dark,
  },
}));



interface AppbarProps {
  setView: (view: "home" | "warehouse" | "AddWarehouse") => void;
}

export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
  const { theme, setTheme } = useTheme();
  const [walletDetails, setWalletDetails] = useState<any>(null);
    const [open, setOpen] = useState(false);
  const router = useRouter();
  const accountId = "1"; // Replace with dynamic account ID if available

  const { data, loading, error, refetch } = useQuery(GET_WALLET_DETAILS, {
    variables: { input: { accountId } },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.getWalletDetails?.walletDetails) {
      setWalletDetails(data.getWalletDetails.walletDetails);
    }
  }, [data]);

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error("Sign out error:", error);
    }
  };

  const refreshWalletDetails = async () => {
    try {
      const { data: updatedData } = await refetch();
      if (updatedData?.getWalletDetails?.walletDetails) {
        setWalletDetails(updatedData.getWalletDetails.walletDetails);
      }
    } catch (err) {
      console.error("Error fetching wallet details:", err);
    }
  };

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    refreshWalletDetails();
  };


  const navigateToCreateOrder = () => {
    router.push("/createorder");
  };

  return (
    <div 
      className={cn(
                "transition-all duration-300 flex flex-col static",
                theme === "dark"
                  ? "bg-[#111827] text-gray-100"
                  : "bg-white text-gray-900",
          
              )}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
         
          </motion.div>
          <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
          </Typography>
        </Box>

        {/* Center Section */}
     

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1, justifyContent: 'center' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <StyledButton
              startIcon={<AddIcon />}
              onClick={navigateToCreateOrder}
            >
              Create Order
            </StyledButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <StyledButton
              startIcon={<AccountBalanceWalletIcon />}
              onClick={() => setOpen(true)}
            >
              Recharge Wallet
            </StyledButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WalletButton
              startIcon={<AccountBalanceWalletIcon />}
              endIcon={<RefreshIcon onClick={refreshWalletDetails} />}
            >
              {loading ? "Loading..." : walletDetails ? `$${walletDetails.balance}` : "N/A"}
            </WalletButton>
          </motion.div>
        </Box>
          <Tooltip title="Settings">
            <SettingApp setView={setView}/>
          </Tooltip>
          <Tooltip title="Help">
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            <IconButton
              color="inherit"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign Out">
            <IconButton color="inherit" onClick={handleSignOut}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <RechargeWalletModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Appbar;

