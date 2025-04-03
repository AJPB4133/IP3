import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', position: 'relative' }}>
        <button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
          Schliessen
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;