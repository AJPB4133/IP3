# IP3: Integration BIM UND GIS
Dieses Repository untersucht die Integration von BIM und GIS zur Optimierung des Strassenunterhaltungsmanagements. Der Fokus liegt dabei auf der Nutzung des Common Data Environment (CDE) Dalux in Verbindung mit SiteWalk (DaluxField). 
Es wird ein Konzept für eine direkte GIS-Anbindung and das CDE sowie ein prototypisches Framework inklusive Testumgebung vorgestellt. Ziel ist die Generierung verbesserter Prozesse im Strassenunterhalt. 
## Funktion
- Webaplikation die Dalux simuliert
- direkte Verbindung zu einem GIS über ein Räumliches Datenbank System
- Zustanderfassung der Strassensegmente

## Requirements

### Repository lokal klonen

Mit Git in einem Terminal das GitHub-Repository _IP3_ in ein lokales Verzeichnis klonen.

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

Die Module können über die Datei **requirements.txt** an der gewünschten Eingabeaufforderung installiert werden. Nachfolgend der Code zur Erstellung der Umgebung mit Anaconda.

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

Das Schema der DB findet sich unter `_DB/db_erstellen.txt._` Schema in pgAdmin kopieren und ausführen.

#### Datenbank Verbindungen

Für die Python- und Javascript-Programme gibt es jeweils eine Datei, in der die Verbindungsinformationen gespeichert werden.

Damit die per Python-Skript über die APIs bezogenen Daten gespeichert werden können, muss die Datei  **config_db_template.py** angepasst und in **config_db.py** umbenannt werden. Die Datei befindet sich im Ordner `Import_DB`. Folgende Parameter müssen geändert werden:

```py
db_config = {
    'host': 'host', #Hostname der DB
    'port': 'port', #Port der DB
    'database': 'database', #Name der DB
    'user': 'user', #Username für die Verbindung zur DB
    'password': 'password'  #Passwort des Username
}
```

Damit die Daten in der React App über die Express API aus der Datenbank geholt werden können, muss die Datei  **config_db_template.js** angepasst und in **config.js** umbenannt werden. Die Datei befindet sich im Ordner `dummy\src\import_db`. Folgende Parameter müssen geändert werden:

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
```

### Datenbank befüllen 

1. Alphanumerische Daten

Die Tabellen `strasse`, `strassentyp` und `zustandstyp` müssen mit den gleichnamigen Python-files befüllt werden. Die Daten befinden sich im Ordner `Daten`.

Die Tabelle `zustand` kann ebenfalls bereits mit einigen Testdaten befüllt werden. Mit der Datei `Import_DB\import_zustandserfassung.py` könnne die Daten im Ordner `zustand_test_files` in die Datenbank gespeichert werden. 


2. Geodaten

Die Tabelle `strassensegment` muss über ein  ein FME-Skript gefüllt werden.  Eine GeoPackage-Datei ist ausreichend. Wenn nur ein ESRI-Shape-File vorhanden ist, muss dieses zuerst in QGIS geladen werden. QGIS mit der erstellten Datenbank verbinden und aus dem Shape-File eine Tabelle erstellen. Diese Tabelle muss, dann mit FME in die Tabelle `strassensegmente` migriert werden. 






#### Node-Server

1. neues Terminal öffnen -> als GitBash
2. Verbindungsaufbau zum Node Server

```bash
cd dummy/src
```

3. Node Server starten

```bash
node db_con.js
```


## Geoserver

Geoserver gemäss der offiziellen [Installationsanleitung](https://docs.geoserver.org/main/en/user/installation/index.html) installieren.
Wichtig bei der Installation ist das die Konfigurationsdatei `web.xml` im Ordner `webapps\geoserver\WEB-INF` durch die Datei aus dem Repository `geoserver\web.xml` ersetzt wird.

Anschliessend den Geoserver mit `bin\startup.bat` neu starten.







