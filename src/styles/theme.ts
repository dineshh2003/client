import { createTheme, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const createCustomTheme = (mode: PaletteMode): Theme => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#4FD1C5',
          },
          background: {
            default: '#F7FAFC',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A202C',
            secondary: '#4A5568',
          },
        }
      : {
          primary: {
            main: '#4FD1C5',
          },
          background: {
            default: '#111827  ',
            paper: '#1e293b  ',
          },
          text: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export const lightTheme = createCustomTheme('light');
export const darkTheme = createCustomTheme('dark');

