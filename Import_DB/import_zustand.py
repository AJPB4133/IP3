"""Dieses Skript importiert die Zustandsklassen in die Datenbank, dafür müssen die Daten in einem JSON-File abgespeichert werden"""

# Import der Bibliotheken
import json
import psycopg2
import logging
import config_db

# Dateipfad

file = "daten\zustand_typen.json"


# Protokollierung konfigurieren

logging.basicConfig(filename="zustand_typen.log",
                    level=logging.INFO,
                    format="%(asctime)s-%(levelname)s-%(message)s")

# JSON-Einlesen

with open(file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Verbindung zur Datenbank

def store_data (data):

    '''Speichert die übergebenen Zustandsinformationen in die Datenbanktabelle "Zustandstyp".

    Diese Funktion stellt eine Verbindung zur PostgreSQL-Datenbank her,
    iteriert durch die übergebene Liste von Daten und fügt für jeden Eintrag
    einen neuen Datensatz in die Tabelle "Zustandstyp" ein. Es wird erwartet,
    dass jedes Dictionary in der Liste die Schlüssel "Note" und "Name" enthält,
    die den Spalten "s_zustandstyp_note" und "s_zustandstyp_nam"' in der
    Datenbank entsprechen.

    Args:
        data (list of dict): Eine Liste von Dictionaries, wobei jedes Dictionary
                             die Schlüssel "Note" und "Name" enthalten sollte.
                             Der Wert unter "Name" wird in die Spalte
                             "s_zustandstyp_name" und der Wert unter "Note" in die
                             Spalte "s_zustandstyp_note" eingefügt.

    Returns:
        None

    Raises:
        psycopg2.Error: Wenn ein Fehler bei der Datenbankverbindung oder
                        beim Ausführen der SQL-Abfrage auftritt.
        Exception: Wenn ein unerwarteter Fehler während des Prozesses auftritt.
                   Dies kann beispielsweise ein Fehler beim Zugriff auf die
                   Schlüssel "Note" oder "Name" in den Dictionaries sein.
    '''

   
    try:
        conn = psycopg2.connect(**config_db.db_config)
        cursor = conn.cursor()

        for item in data:
            note = item["Note"]
            name = item["Name"]

            cursor.execute(
                # SQL Abfrage um die Daten in die Datenbank einzulesen
                f"INSERT INTO Zustandstyp (s_zustandstyp_name, s_zustandstyp_note) VALUES (%s,%s)",
                (name, note,)
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
    


        


