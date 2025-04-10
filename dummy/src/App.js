import React from 'react';
import DatenFormular from './datenformular'; // Pfad zu deiner DatenFormular-Komponente
import Karte from './Karte';
import { Box } from '@mui/material';


function App() {
  //const handleVerbindenKlick = async () => {
  //  try {
  //    const antwort = await fetch('http://localhost:5000/api/kant_radroute');
  //    if (!antwort.ok) {
  //      throw new Error(`HTTP error! status: ${antwort.status}`);
  //    }
  //    const daten = await antwort.json();
  //    console.log('Daten erfolgreich vom Backend abgerufen:', daten);
  //    alert('Verbindung zur Datenbank erfolgreich!');
  //  } catch (fehler) {
  //    console.error('Fehler beim Verbinden mit dem Backend:', fehler);
  //    alert('Fehler beim Verbinden mit der Datenbank.');
  //  }
  //};

  return (
    <Box
    sx={{
        display:'flex',
        flexDirection:'column',
        width:'100vw',
        height: '50vw',
        alignItems: 'flex-start'
    }}
    >
      <Box
        sx={{
          flex: 1,
          padding:2,
          bgcolor: 'p_white.main',
        }}
        >
          <DatenFormular />
      </Box>
      <Box
      sx={{
        flex: 1,
        padding:2,
        bgcolor: 'grey.200',
        overflow: 'hidden',
      }}
      >
        <Karte />
      </Box>
    </Box>



  );
}

export default App;