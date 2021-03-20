from pathlib import Path

class Config(object):
    DATABASE_PATH = Path(Path.cwd(), "db.db")

