/*-----------------------------------------------
  Dieser Code erstellt das Eingabeformular für die 
  Zustandbeurteilung. Dafür wird das Modul "Modal"
  importiert.
--------------------------------------------------*/



import React, { useState } from 'react';
import Modal from './modal'; 

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
    try {
      const antwort = await fetch('http://localhost:5000/api/zustand', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datum, name,vorname, text, Segment, Zustand }), 
      });

      if (antwort.ok) {
        alert('Daten erfolgreich gesendet!');
        setDatum('');
        setName('');
        setVorname('');
        setText('');
        setSegment('');
        setZustand('');
        setAnzeigenFormular(false);
      } else {
        alert('Fehler beim Senden der Daten.');
      }
    } catch (fehler) {
      console.error('Fehler:', fehler);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const zustandsOptionen = [
    { value: 1, label: 'Gut' },
    { value: 2, label: 'Annehmbar' },
    { value: 3, label: 'Ungenügend' },
    { value: 4, label: 'Schlecht' },
    { value: 5, label: 'Alarmierend' },
    { value: 6, label: 'keine Angabe' },
  ];

  const segmente = [
    { value: 87, label: 87},
    { value: 108, label: 108},
    { value: 152, label: 152},
    { value: 162, label: 162},
    { value: 344, label: 344},
    { value: 353, label: 353},
    { value: 363, label: 363},
    { value: 364, label: 364},
    { value: 500, label: 500},
  ]

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
              {segmente.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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