from app.model import MainDB



# create table
# model_ls = [MainDB()]
# for m in model_ls:
#     m.create_table()

db = MainDB()

result = db.read()
print(result)