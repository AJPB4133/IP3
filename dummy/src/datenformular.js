import React, { useState } from 'react';
import Modal from './modal'; // Importiere die Modal-Komponente

function DatenFormular() {
  const [anzeigenFormular, setAnzeigenFormular] = useState(false);
  const [name, setName] = useState('');
  const [vorname, setVorname] = useState('');
  const [datum, setDatum] = useState('');
  const [text, setText] = useState('');
  const [Segment, setSegment] = useState('');
  const [Zustand, setZustand] = useState('');

  const zeigeFormular = () => {
    setAnzeigenFormular(true);
  };

  const schliesseFormular = () => {
    setAnzeigenFormular(false);
  };

  const sendeDaten = async () => {
    // ... (deine sendeDaten-Funktion bleibt gleich)
  };

  const zustandsOptionen = [
    { value: 'Gut', label: 'Gut' },
    { value: 'Annehmbar', label: 'Annehmbar' },
    { value: 'Ungenügend', label: 'Ungenügend' },
    { value: 'Schlecht', label: 'Schlecht' },
    { value: 'Alarmierend', label: 'Alarmierend' },
    { value: 'keine Angabe', label: 'keine Angabe' },
  ];

  return (
    <div>
      <button onClick={zeigeFormular}>Zustand erfassen</button>
      {anzeigenFormular && (
        <Modal onClose={schliesseFormular}>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Vorname:</label>
            <input type="text" value={vorname} onChange={(e) => setVorname(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Datum:</label>
            <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ marginBottom: '10px' }} />
            <label>Segment:</label>
            <select value={Segment} onChange={(e) => setSegment(e.target.value)} style={{ marginBottom: '10px' }}>
              <option value="">Segment auswählen</option>
              {/* Hier füge die Optionen für Segmente ein */}
            </select>
            <label>Zustand:</label>
            <select value={Zustand} onChange={(e) => setZustand(e.target.value)} style={{ marginBottom: '10px' }}>
              <option value="">Zustand auswählen</option>
              {zustandsOptionen.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={sendeDaten}>Senden</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default DatenFormular;