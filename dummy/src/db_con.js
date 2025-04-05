const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IP3-GIS CDE',
  password: 'TeamLH44',
  port: 5432,
});

app.post('/api/zustand', async (req, res) => {
  const { name,vorname,  datum, text, Segment, Zustand } = req.body;
  try {
    await pool.query('INSERT INTO Zustand (zustand_datum,zustand_erfasser_n,zustand_erfasser_v,zustand_begruendung, s_id,s_zustandstyp_id   ) VALUES ($1, $2, $3, $4, $5, $6 )', [datum, name,vorname, text, Segment, Zustand]);
    res.send('Daten gespeichert');
  } catch (fehler) {
    console.error('Fehler beim Speichern der Daten:', fehler);
    res.status(500).send('Fehler beim Speichern der Daten');
  }
});

app.get('/api/kant_radroute', async (req, res) => {
  try {
    const antwort = await pool.query('SELECT id, geom FROM kant_radroute'); // Abfrage anpassen
    res.json(antwort.rows);
  } catch (fehler) {
    console.error('Fehler beim Abrufen der Strassensegmente:', fehler);
    res.status(500).send('Fehler beim Abrufen der Daten');
  }
});


app.listen(5000, () => {
  console.log('Server läuft auf Port 5000');
});