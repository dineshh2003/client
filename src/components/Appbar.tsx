"use client";

import React from "react";
import { Button, Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  AddIcon,
  HelpIcon,
  NightIcon,
  RestartIcon,
  SettingIcon,
  WalletIcon,
} from "../app/utils/Icons";
import SettingApp from "../app/utils/SettingButton";

interface AppbarProps {
  setView: (view: "home" | "warehouse") => void;
}

export const Appbar: React.FC<AppbarProps> = ({ setView }) => {
  return (
    <div className="w-auto">
      <AppBar
        sx={{
          width: `calc(100%)`,
          // ml: `300px`,
          // padding: "0.05rem 0.5rem",
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
                $1718.20
              </Typography>
              <RestartIcon />
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SettingApp setView={setView} /> {/* Settings Dropdown */}

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
    </div>
  );
};
