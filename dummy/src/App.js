import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DatenFormular from './datenformular';
import Karte from './Karte';
import Kart from './mape_test';




function App() {
  return (
    <Grid container sx={{ width: '100vw', height: '100vh' }}>
      <Grid item xs={12} md={12}>
        <Box sx={{ padding: 2, bgcolor: 'p_white.main' }}>
          <DatenFormular />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}> {/* Wichtig für die Kartenbreite */}
        <Box sx={{ flexGrow: 1, bgcolor: 'grey.200', height: 'calc(100vh - 68px)' }}>
          <Karte />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;