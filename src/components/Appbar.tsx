"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  AddIcon,
  HelpIcon,
  NightIcon,
  RestartIcon,
  WalletIcon,
} from "../app/utils/Icons";
import SettingApp from "../app/utils/SettingButton";
import RechargeWalletModal from "./ReachargeWalletModal";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface AppbarProps {
  setView: (view: "home" | "warehouse") => void;
}

// GraphQL Query to fetch wallet details
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

export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
  const [open, setOpen] = useState(false); // Manage modal visibility
  const [walletDetails, setWalletDetails] = useState<any>(null);
  const router = useRouter(); // Initialize useRouter

  // Account ID for querying wallet details
  const accountId = "1"; // Replace with dynamic account ID if available

  // Fetch wallet details
  const { data, loading, error, refetch } = useQuery(GET_WALLET_DETAILS, {
    variables: { input: { accountId } },
    fetchPolicy: "cache-and-network",
  });

  // Update wallet details on data fetch
  useEffect(() => {
    if (data && data.getWalletDetails && data.getWalletDetails.walletDetails) {
      setWalletDetails(data.getWalletDetails.walletDetails);
    }
  }, [data]);

  // Function to refresh wallet details
  const refreshWalletDetails = async () => {
    try {
      const { data: updatedData } = await refetch();
      if (updatedData && updatedData.getWalletDetails && updatedData.getWalletDetails.walletDetails) {
        setWalletDetails(updatedData.getWalletDetails.walletDetails);
      }
    } catch (err) {
      console.error("Error fetching wallet details:", err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    refreshWalletDetails(); // Refresh wallet details after closing modal
  };

  const navigateToCreateOrder = () => {
    router.push("/createorder");
  };

  return (
    <div className="w-auto">
      <AppBar
        sx={{
          width: `calc(100%)`,
          position: "absolute",
        }}
        className="bg-gray-900"
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#42C195",
                color: "#fff",
                height: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
                borderRadius: "12px",
                padding: "0.5rem 1.5rem",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                "&:hover": { backgroundColor: "#38B583" },
              }}
              startIcon={<AddIcon />}
              onClick={navigateToCreateOrder}
            >
              Create Order
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#42C195",
                color: "#fff",
                height: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
                borderRadius: "12px",
                padding: "0.5rem 1.5rem",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                "&:hover": { backgroundColor: "#38B583" },
              }}
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Recharge Wallet
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#42C195",
                color: "#fff",
                height: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
                borderRadius: "12px",
                padding: "0.5rem 1.5rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                "&:hover": { backgroundColor: "#38B583" },
              }}
              startIcon={<WalletIcon />}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {loading ? "Loading..." : walletDetails ? `$${walletDetails.balance}` : "N/A"}
              </Typography>
              <RestartIcon />
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SettingApp setView={setView} />
            <IconButton
              sx={{
                color: "#50C878",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)", color: "#42C195" },
              }}
            >
              <HelpIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "#50C878",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.2)", color: "#42C195" },
              }}
            >
              <NightIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Recharge Wallet Modal */}
      <RechargeWalletModal open={open} handleClose={handleClose} />
    </div>
  );
};
