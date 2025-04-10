"""Dieses Programm importiert Strassentypen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

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
    


        


