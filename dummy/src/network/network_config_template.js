/*---------------------------------------------------------------------
Dieser Code dient als Konfigurationsdatei zur Festlegung der IP-Adresse, 
auf die zugegriffen werden soll. Dies geschieht aus Datenschutzgründen.
Die IP-Adresse wird für die Verbindung zum Backend gebraucht.
--------------------------------------------------------------------*/

const IP = ""; // hier IP Adresse eintragen auf dem das Projekt läuft (Laptop oder Server)

const config = {
  projectIPadress: `http://${IP}`,
};

export default config;