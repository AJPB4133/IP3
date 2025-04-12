"""Dieser Code importiert Strassennamen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

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

# Verbindung zur Datenbank und Dateneinlesen

def store_data (data):


    '''Speichert die übergebenen Daten in die Datenbanktabelle 'Strasse'.

    Diese Funktion stellt eine Verbindung zur PostgreSQL-Datenbank her,
    iteriert durch die übergebenen Daten und fügt jeden Datensatz
    in die Tabelle 'Strasse' ein.

    
    Args:
        data (list of dict): Eine Liste von Dictionaries, wobei jedes Dictionary die Schlüssel "ID", "Name" und "Typ_ID" enthalten soll,
                            die den Spalten "strasse_id", "strassen_name" und "strassentyp_ID" in der Datenbank entsprechen.
        

    Returns:
        None

    Raises:
        psycopg2.Error: Wenn ein Fehler bei der Datenbankverbindung oder
                        beim Ausführen der SQL-Abfrage auftritt.
        Exception: Wenn ein unerwarteter Fehler während des Prozesses auftritt.
                   Dies kann beispielsweise ein Fehler beim Zugriff auf
                   die Daten in den Dictionaries sein

    
    '''
   
    try:
        conn = psycopg2.connect(**config_db.db_config)
        cursor = conn.cursor()

        for item in data:
            id = item["ID"]
            name = item["Name"]
            typ = item["Typ_ID"]
            cursor.execute(
                # SQL Abfrage um die Daten in die Datenbank einzulesen
                f"INSERT INTO Strasse (strasse_id, strassen_name, strassentyp_ID) VALUES (%s,%s,%s)",  
                (id, name, typ)
,            )
        conn.commit()
        cursor.close()
        conn.close()
        logging.info("Daten erfolgreich in die Datenbank importiert")


    except psycopg2.Error as e:
        logging.error(f"Fehler bei der Datenbankverbindung: {e}")
    except Exception as e:
        logging.error(f"Ein unerwarteter Fehler ist aufgetretten: {e}")

# Führt die Funktion aus. um die DAten in die Datenbankk zu speichern. 
store_data(data)
    


        


