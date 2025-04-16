/*---------------------------------------------------
Dieser Code erstellt die Datenverbindung zum node-server
mit der Express-API her. Zudem ist dieser Code für die 
Speicherung der Daten in die Datenbank zuständig.
--------------------------------------------------*/

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const config_db = require("./import_db/config_db")

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool(config_db);



// Diese Funktion ist für die Speicherung der Daten aus dem Eingabeformular in die Datenbank zuständig.
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



app.listen(5000, () => {
  console.log('Server läuft auf Port 5000');
});