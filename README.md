# IP3: Integration BIM UND GIS
Diese Repository untersucht die Integration von BIM und GIS zur Optimierung des Strassenunterhaltungsmanagements. Der Fokus liegt dabei auf der Nutzung des Common Data Environment (CDE) Dalux in Verbindung mit SiteWalk (DaluxField). 
Es wird ein Konzept für eine direkte GIS-Anbindung and das CDE sowie ein prototypisches Framework inklusive Testumgebung vorgestellt. Ziel ist die Generierung verbesserter Prozesse im Strassenunterhalt. 
## Funktion
- Webaplikation die Dalux simuliert
- direkte Verbindung zu einem GIS über ein Räumliches Datenbank System
- Zustanderfassung der Strassensegmente

## Requirements

### Repository lokal klonen

Mit Git in einem Terminal das GitHub Repository _IP3_ in ein lokales Verzeichnis klonen.

1. Speicherort angeben

```python
cd /path/to/workspace
```

2. Repository klonen

```python
git clone https://github.com/AJPB4133/IP3.git
```

### Python-Requirements

Folgende Python-Module müssen für das Backend installiert werden:

- Python 3.9.20
- psycopg2

Die Module können über das **requirements.txt** im gewünschten Prompt installiert werden. Folgend den Code für die Erstellung des
Environments mit Anaconda.

1. Speicherort für Environment festlegen

```bash
cd path/to/workspace
```

2. Python Environment erstellen

```bash
conda create -n my_env python=3.9.21 -c conda-forge --file path/to/requirements.txt
```

### FME-Requirements

FME Workbench 2024.0.1  oder aktueller. Kann auf der Webseite von [Safe Software heruntergeladen](https://fme.safe.com/downloads/) werden. Die Software ist Lizenzpflichtig.

### QGIS-Requirements

QGIS Desktop 3.34.4-Prizren oder aktueller. Kann auf der Webseite von [QGIS heruntergeladen](https://qgis.org/de/site/forusers/download.html) werden. Die Software ist Open-Source.

### Node-Requirements

Die Testumgebung wurde mit der Node version 18.18.0 getestet.

### GeoServer-Requirements

Voraussetzung für die Benutzung der Testumgebung ist die GeoServer Version 2.21.4.  Hier ist die offizielle [Installationsanleitung](https://docs.geoserver.org/main/en/user/installation/index.html) für die verschieden Betriebssysteme.


## Installation

### Frontend

Um die Testumgebung zum Laufen zu bringen, müssen folgende Schritte ausgeführt werden:

1. neues Terminal öffnen -> als GitBash
2. Ordner wechseln

```bash
cd IP3
```

3. npm Module installieren

```bash
npm install
```

4. In der Datei `alpine_ace\src\network\network_config_template.js` die aktuelle IP Adresse eintragen und Datei in *network_config.js* umbenennen.

5. React-App starten

```bash
npm start
```
### Backend

Das Backend besteht aus vier Komponenten. Einem Datenbezugsteil (Python), einer Datenbank (Postgres inkl. Postgis), einem Node-Server und einem GeoServer der die Geodaten zur Verfügung stellt.

#### Postgres inkl. Postgis

Das Schema der DB findet sich unter _DB/db_erstellen.txt._ Schema in pgAdmin kopieren und ausführen.

#### Datenbank Verbindungen

Für die Python und Javascript Programme gibt es je eine Datei, in der die Verbindungsinformationen gespeichert sind.

Damit die bezogenen Daten per Python Script über die APIs gespeichert werden können, muss das **config_db_template.py** angepasst und in **config_db.py** umbenannt werden. Die Datei ist im Ordner `Import_DB`. Es müssen folgende Parameter geändert werden:

```py
db_config = {
    'host': 'host', #Hostname der DB
    'port': 'port', #Port der DB
    'database': 'database', #Name der DB
    'user': 'user', #Username für die Verbindung zur DB
    'password': 'password'  #Passwort des Username
}
```

Damit die Daten in der React App mit der Express API von der Datenbank bezogen werden können, muss das **config_db_template.js** angepasst und in **config.js** umbenannt werden. Die Datei ist im Ordner `dummy\src\import_db`. Es müssen folgende Parameter geändert werden:

```js
module.exports = {
  user: "username", // Username für die Verbindung zur DB
  host: "hostname", // Hostname der DB
  database: "databasename", //Name der DB
  password: "password", //Passwort des Username
  port: "portnumber", //Port der DB
};
```
## Datenbank

1. Mit pgAdmin 4 eine neue Datenbank erstellen mit dem Namen: `IP3`
2. Extension [postgis](https://postgis.net/) installieren.

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgrouting;
```


GIS/CDE Integration with Database
