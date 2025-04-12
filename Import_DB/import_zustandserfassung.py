"""Dieses Skript importiert die Zustandserfassung in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden. 
Diese Datei dient nur zu Testzwecke. Sie stellt die Schnittstelle zwischen CDE und DB dar"""

# Import der Bibliotheken
import json
import psycopg2
import logging
import config_db

# Dateipfad

file = "zustand_typen.json"


# Protokollierung konfigurieren

logging.basicConfig(filename="zustandserfassung.log",
                    level=logging.INFO,
                    format="%(asctime)s-%(levelname)s-%(message)s")

# JSON-Einlesen

with open(file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Verbindung zur Datenbank

def store_data (data):

    '''Speichert Zustandsdaten in die Datenbanktabelle 'typen'.

    Diese Funktion stellt eine Verbindung zur PostgreSQL-Datenbank her,
    iteriert durch die übergebene Liste von Daten und fügt für jeden Eintrag
    einen neuen Datensatz in die Tabelle 'typen' ein. Es wird erwartet,
    dass jedes Dictionary in der Liste die Schlüssel "Zustand", "Zustand_Note",
    "Segment", "Erfasser" (mit Unterschlüsseln "Name" und "Vorname"), "Datum"
    und "Notizen" enthält.

    Args:
        data (list of dict): Eine Liste von Dictionaries, wobei jedes Dictionary
                             die erwarteten Schlüssel enthalten muss. Die Werte
                             werden den entsprechenden Spalten in der Tabelle
                             "typen" zugeordnet.

    Returns:
        None

    Raises:
        psycopg2.Error: Wenn ein Fehler bei der Datenbankverbindung oder
                        beim Ausführen der SQL-Abfrage auftritt.
        Exception: Wenn ein unerwarteter Fehler während des Prozesses auftritt.
                   Dies kann beispielsweise ein Fehler beim Zugriff auf die
                   erwarteten Schlüssel in den Dictionaries sein.
    '''
   
    try:
        conn = psycopg2.connect(**config_db.db_config)
        cursor = conn.cursor()

        for item in data:
            Zustand = item["Zustand"]
            Note = item["Zustand_Note"]
            Segment = item["Segment"]
            Erfasser_Name = item["Erfasser"]["Name"]
            Erfasser_Vorname = item["Erfasser"]["Vorname"]
            Datum = item["Datum"]
            Notizen = item ["Notizen"]

            print (Zustand)

            cursor.execute(
                # SQL Abfrage um die Daten in die Datenbank einzulesen
                f"INSERT INTO typen (zustand_datum, zustand_erfasser_n, zustand_erfasser_v, zustand_begruendung, s_zustandstyp_id ,s_id) VALUES (%s,%s, %s,%s,%s,%s)",
                (Datum, Erfasser_Name, Erfasser_Vorname, Notizen, Zustand, Segment)
,            )
        conn.commit()
        cursor.close()
        conn.close()
        logging.info("Daten erfolgreich in die Datenbank importiert")


    except psycopg2.Error as e:
        logging.error(f"Fehler bei der Datenbankverbindung: {e}")
    except Exception as e:
        logging.error(f"Ein unerwarteter Fehler ist aufgetretten: {e}")


store_data(data)
    


        


