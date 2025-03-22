"""Dieses Programm importiert die Zustandstypen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

# Import der Bibliotheken
import json
import psycopg2
import logging
import config_db

# Dateipfad

file = "zustand_typen.json"


# Protokollierung konfigurieren

logging.basicConfig(filename="zustand_typen.log",
                    level=logging.INFO,
                    format="%(asctime)s-%(levelname)s-%(message)s")

# JSON-Einlesen

with open(file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Verbindung zur Datenbank

def store_data (data):
   
    try:
        conn = psycopg2.connect(**config_db.db_config)
        cursor = conn.cursor()

        for item in data:
            id = item["ID"]
            note = item["Note"]
            name = item["Name"]

            cursor.execute(
                f"INSERT INTO typen (typen_id, typen_name, typen_note) VALUES (%s,%s, %s)",
                (id, name, note)
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
    


        


