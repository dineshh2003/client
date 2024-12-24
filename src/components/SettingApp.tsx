import React from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

interface SettingAppProps {
  setView: (view: "home" | "warehouse") => void
}

const SettingApp: React.FC<SettingAppProps> = ({ setView }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleViewChange = (view: "home" | "warehouse") => {
    setView(view)
    handleClose()
  }

  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          onClick={handleClick}
          color="primary"
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleViewChange("home")}>Home</MenuItem>
        <MenuItem onClick={() => handleViewChange("warehouse")}>Warehouse</MenuItem>
      </Menu>
    </>
  )
}

export default SettingApp

