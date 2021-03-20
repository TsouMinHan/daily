from app.model import MainDB


model_ls = [MainDB()]

for m in model_ls:
    m.create_table()