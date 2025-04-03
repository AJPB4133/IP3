import React, { useState, useEffect } from 'react';

function StrassensegmenteListe() {
  const [strassensegmente, setStrassensegmente] = useState([]);

  useEffect(() => {
    async function holeDaten() {
      try {
        const antwort = await fetch('/api/kant_radroute'); // Dein Backend-Endpunkt
        if (antwort.ok) {
          const daten = await antwort.json();
          setStrassensegmente(daten);
        } else {
          console.error('Fehler beim Abrufen der Strassensegmente');
        }
      } catch (fehler) {
        console.error('Fehler:', fehler);
      }
    }

    holeDaten();
  }, []);

  return (
    <div>
      <h2>Strassensegmente</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Strasse ID</th>
          </tr>
        </thead>
        <tbody>
          {strassensegmente.map((segment) => (
            <tr key={segment.s_id}>
              <td>{segment.id}</td>
              <td>{segment.geom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StrassensegmenteListe;