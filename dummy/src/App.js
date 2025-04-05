import React from 'react';
import DatenFormular from './datenformular'; // Pfad zu deiner DatenFormular-Komponente

function App() {
  const handleVerbindenKlick = async () => {
    try {
      const antwort = await fetch('http://localhost:5000/api/kant_radroute');
      if (!antwort.ok) {
        throw new Error(`HTTP error! status: ${antwort.status}`);
      }
      const daten = await antwort.json();
      console.log('Daten erfolgreich vom Backend abgerufen:', daten);
      alert('Verbindung zur Datenbank erfolgreich!');
    } catch (fehler) {
      console.error('Fehler beim Verbinden mit dem Backend:', fehler);
      alert('Fehler beim Verbinden mit der Datenbank.');
    }
  };

  return (
    <div>
      <h1>Zustandserfassung</h1>
      <DatenFormular />
      <button onClick={handleVerbindenKlick}>Mit Datenbank verbinden</button>
    </div>
  );
}

export default App;