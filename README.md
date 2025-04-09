# IP3: Integration BIM UND GIS
Diese Repository untersucht die Integration von BIM und GIS zur Optimierung des Strassenunterhaltungsmanagements. Der Fokus liegt dabei auf der Nutzung des Common Data Environment (CDE) Dalux in Verbindung mit SiteWalk (DaluxField). 
Es wird ein Konzept für eine direkte GIS-Anbindung and das CDE sowie ein prototypisches Framework inklusive Testumgebung vorgestellt. Ziel ist die Generierung verbesserter Prozesse im Strassenunterhalt. 
## Funktion
- Webaplikation die Dalux simuliert
- direkte Verbindung zu einem GIS über ein Räumliches Datenbank System
- Zustanderfassung der Strassensegmente


## Rewuirements

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

Folgende Python-Module müssen für das Backend Installiert werden:

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


GIS/CDE Integration with Database
