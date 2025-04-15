import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DatenFormular from './datenformular';
import Karte from './Karte';

function App() {
  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}> 
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={12}>
          <Box sx={{ padding: 2, bgcolor: 'p_white.main' }}>
            <DatenFormular /> 
          </Box>
        </Grid>
        <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', height: 'calc(100vh - 68px)' }}>
            <Karte />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;