"""Dieses Programm importiert Strassennamen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

# Import der Bibliotheken
import json
import psycopg2
import logging
import config_db

# Dateipfad

file = "strasse.json"


# Protokollierung konfigurieren

logging.basicConfig(filename="strasse.log",
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
            name = item["Name"]
            typ_id = item["Typ_ID"]
            cursor.execute(
                f"INSERT INTO strasse (strasse_id, strassen_name, strassentyp_id) VALUES (%s,%s,%s)",
                (id, name, typ_id)
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
    


        


