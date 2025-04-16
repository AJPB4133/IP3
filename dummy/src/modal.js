/*-------------------------------------------------------------
  Dieser Code erstellt das Dialogfenster für das Eingabeformular
  der Zustandsbewertung.
-------------------------------------------------------------*/

import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1100, 
      }}
      onClick={onClose} // Optional: Schließt den Modal beim Klick außerhalb
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          position: 'relative',
          zIndex: 1200, 
        }}
        onClick={(e) => e.stopPropagation()} // Verhindert Schließen durch Klick im Modal
      >
        <button
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={onClose}
        >
          Schliessen
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;