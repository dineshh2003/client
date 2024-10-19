

import React from 'react';
import PermanentDrawerLeft from './components/SideBar'; 
import { Appbar } from './components/Appbar'; 
import IndexBar from './components/IndexBar'; 
import { Box, Divider, Toolbar } from '@mui/material'; 
import TrackBar from './components/TrackBar';
import ModifyBar from './components/ModifyBar';
import DataTable from './components/DataTable';
import OrdersTable from './components/DataTable';
import CheckboxRowSelectionDemo from './components/DataTable';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  return (
    // <Box 
    //   sx={{ 
    //     display: 'flex', 
    //     height: '100vh', 
    //     backgroundColor: '#121212'
    //   }}
    // >
    //   <PermanentDrawerLeft />
    //   <Box 
    //     sx={{ 
    //       flexGrow: 1, 
    //       display: 'flex', 
    //       flexDirection: 'column',
    //       border: '1px solid #42C195', 
    //       borderRadius: '45px', 
    //       overflow: 'hidden' 
    //     }}
    //   >
    //     <Appbar /> 
    //     <Box sx={{ padding: '1rem', flexGrow: 1, backgroundColor: '#121212', color: '#fff', mt: '4.5rem' }}>
    //       <IndexBar /> 
    //       <TrackBar/>
    //       <ModifyBar/>
    //       <CheckboxRowSelectionDemo/>
    //       <ProgressBar/>
    //     </Box>
    //   </Box>
    // </Box>
    <div>
      hello jiii
    </div>
  );
};

export default App;
