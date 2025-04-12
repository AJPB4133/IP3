"""Dieses Skript importiert Strassentypen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

# Import der Bibliotheken
import json
import psycopg2
import logging
import config_db

# Dateipfad

file = "strassentyp.json"


# Protokollierung konfigurieren

logging.basicConfig(filename="strassetyp.log",
                    level=logging.INFO,
                    format="%(asctime)s-%(levelname)s-%(message)s")

# JSON-Einlesen

with open(file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Verbindung zur Datenbank und Einlesen der Daten

def store_data (data):

    '''Speichert die übergebenen Strassentyp-Namen in die Datenbanktabelle "Strassentyp".

    Diese Funktion baut eine Verbindung zur PostgreSQL-Datenbank auf,
    iteriert durch die übergebene Liste von Daten und fügt jeden eindeutigen
    "Name"-Wert als neuen Eintrag in die Tabelle "Strassentyp" ein.
    

    Args:
        data (list of dict): Eine Liste von Dictionaries, wobei jedes Dictionary
                             einen Schlüssel "Name" enthalten sollte, dessen Wert
                             als "strassentyp_name" in die Datenbank eingefügt wird.

    Returns:
        None

    Raises:
        psycopg2.Error: Wenn ein Fehler bei der Datenbankverbindung oder
                        beim Ausführen der SQL-Abfrage auftritt.
        Exception: Wenn ein unerwarteter Fehler während des Prozesses auftritt.
                   Dies kann beispielsweise ein Fehler beim Zugriff auf
                   den Schlüssel "Name" in den Dictionaries sein.

    '''


   
    try:
        conn = psycopg2.connect(**config_db.db_config)
        cursor = conn.cursor()

        for item in data:
            name = item["Name"]
            cursor.execute(
                # SQL Abfrage um die Daten in die Datenbank einzulesen
                f"INSERT INTO Strassentyp (strassentyp_name) VALUES (%s)",
                (name,)
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
    


        


