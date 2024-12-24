'use client'

import React from "react"
import Image from "next/image"
import { signOut } from "next-auth/react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import RefreshIcon from "@mui/icons-material/Refresh"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingApp from "./SettingApp"
import { toast } from "sonner"

interface AppbarProps {
  setView: (view: "home" | "warehouse") => void
}

export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      })
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Failed to sign out")
      console.error("Sign out error:", error)
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#111827",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Image
            src="/rocket.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />

        {/* Center Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#42C195",
              color: "white",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { backgroundColor: "#38B583" },
            }}
            >
            Create Order
          </Button>
          <Button
            variant="contained"
            startIcon={<AccountBalanceWalletIcon />}
            endIcon={<RefreshIcon />}
            sx={{
              backgroundColor: "#50C878",
              color: "white",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { backgroundColor: "#45B36B" },
            }}
          >
            $1,718.20
          </Button>
        </Box>
      </Box>
        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SettingApp setView={setView} />
          <Tooltip title="Help">
            <IconButton color="primary">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Dark Mode">
            <IconButton color="primary">
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign Out">
            <IconButton color="error" onClick={handleSignOut}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

