import sqlite3

from app import Config

class DBHandler(object):
    def __init__(self):
        self.db_name = f"{Config.DATABASE_PATH}"

    def __enter__(self):
        self.start_database()
        return self

    def __exit__(self, exc_type, ex_value, ex_traceback):
        self.close_database()
    
    def start_database(self,):
        self.conn = sqlite3.connect(self.db_name)
        self.cur = self.conn.cursor()

    def close_database(self,):
        """shut down connect to DB
        """
        self.conn.close()

class MainDB:  
    def __init__(self):
        self.db = DBHandler()
        self.table_name = "daily"

    def create_table(self):
        with self.db:
            sql = f"""
                    CREATE TABLE IF NOT EXISTS {self.table_name} (
                    id integer PRIMARY KEY,
                    content Text, 
                    date DATETIME
                );
            """
            
            self.db.cur.execute(sql)
    
    def append(self, content, date):
        with self.db:
            sql = f"""
                    INSERT INTO {self.table_name} (content, date)
                    VALUES ('{content}', '{date}');
            """
            print(sql)
            self.db.cur.execute(sql)
            self.db.conn.commit()