import React, { useState } from 'react';
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import WarehouseForm from '@/utils/WarehouseForm';
import WarehousesPage from './Warehouse';

interface SettingAppProps {
  setView: (view: "home" | "warehouse" | "AddWarehouse") => void;
}

const SettingApp: React.FC<SettingAppProps> = ({ setView }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isWarehouseFormOpen, setIsWarehouseFormOpen] = useState(false);
  const [isWarehousePageOpen, setIsWarehousePageOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "warehouse" | "AddWarehouse">("home");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (view: "home" | "warehouse" | "AddWarehouse") => {
    setCurrentView(view);
    setView(view);
    handleClose();
    
    if (view === "AddWarehouse") {
      setIsWarehouseFormOpen(true);
    } else if (view === "warehouse") {
      setIsWarehousePageOpen(true);
    }
  };

  const handleWarehouseFormClose = () => {
    setIsWarehouseFormOpen(false);
    setView("home");
    setCurrentView("home");
  };

  const handleWarehousePageClose = () => {
    setIsWarehousePageOpen(false);
    setView("home");
    setCurrentView("home");
  };

  return (
    <>
      <Tooltip title="Settings">
        <Button
          startIcon={<SettingsIcon />}
          onClick={handleClick}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
          }}
        >
          Settings
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleViewChange("home")}>Home</MenuItem>
        <MenuItem onClick={() => handleViewChange("warehouse")}>Warehouse</MenuItem>
        <MenuItem onClick={() => handleViewChange("AddWarehouse")}>Add Warehouse</MenuItem>
      </Menu>
      <WarehouseForm 
        open={isWarehouseFormOpen} 
        onClose={handleWarehouseFormClose} 
      />
      <WarehousesPage 
        open={isWarehousePageOpen}
        onClose={handleWarehousePageClose}
      />
    </>
  );
};

export default SettingApp;