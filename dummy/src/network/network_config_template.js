// IP Adresse auf dem das Projekt läuft (Laptop oder Server)
// Die IP Adresse wird benötigt, um die Verbindung zwischen dem Frontend und dem Backend herzustellen (WFS Abfragen und Express API)

const IP = ""; // hier IP Adresse eintragen

const config = {
  projectIPadress: `http://${IP}`,
};

export default config;