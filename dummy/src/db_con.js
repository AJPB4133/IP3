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

app.post('/api/daten', async (req, res) => {
  const { name, datum, text } = req.body;
  try {
    await pool.query('INSERT INTO zustand (name, datum, text) VALUES ($1, $2, $3)', [name, datum, text]);
    res.send('Daten gespeichert');
  } catch (fehler) {
    console.error('Fehler beim Speichern der Daten:', fehler);
    res.status(500).send('Fehler beim Speichern der Daten');
  }
});

app.listen(5000, () => {
  console.log('Server läuft auf Port 5000');
});