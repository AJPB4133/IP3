import React, { useState } from 'react';
import Modal from './modal'; // Importiere die Modal-Komponente

function DatenFormular() {
  const [anzeigenFormular, setAnzeigenFormular] = useState(false);
  const [name, setName] = useState('');
  const [vorname, setVorname] = useState('');
  const [datum, setDatum] = useState('');
  const [text, setText] = useState('');

  const zeigeFormular = () => {
    setAnzeigenFormular(true);
  };

  const schliesseFormular = () => {
    setAnzeigenFormular(false);
  };

  const sendeDaten = async () => {
    // ... (deine sendeDaten-Funktion bleibt gleich)
  };

  return (
    <div>
      <button onClick={zeigeFormular}>Daten hinzufügen</button>
      {anzeigenFormular && (
        <Modal onClose={schliesseFormular}> {/* Verwende das Modal */}
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Vorname:</label>
            <input type="text" value={vorname} onChange={(e) => setVorname(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Datum:</label>
            <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ marginBottom: '10px' }} />
            <button type="button" onClick={sendeDaten}>Senden</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default DatenFormular;