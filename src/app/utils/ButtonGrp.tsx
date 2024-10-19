"use client";  // Ensures this file is treated as a client component

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['Create a merge commit', 'Select Filter', 'Rebase and merge'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{
          backgroundColor: '#121212', // Same as other buttons
          color: '#fff',
          
          borderRadius: '15px', // Same rounded corners
          '& .MuiButtonGroup-grouped': {
            borderColor: 'transparent', // Remove button borders
          },
          '&:hover': {
            backgroundColor: '#38B583', // Hover effect
          },
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: '#121212', // Match the color
            color: '#38B583',
            height: '30px',
            fontSize: '1.2rem',
            textTransform: 'none',
            borderRadius: '15px 0 0 15px', // Rounded left corners
            padding: '0.5rem 1.5rem',
            '&:hover': { backgroundColor: '#38B583', color: '#FFF' }, // Hover color
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          sx={{
            backgroundColor: '#121212',
            fontSize: '1.5rem',
            color: '#fff',
            padding: '0.5rem 0.75rem',
            borderRadius: '0 15px 15px 0', // Rounded right corners
            '&:hover': { backgroundColor: '#38B583' }, // Hover color
          }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
