from flask import request, jsonify

from datetime import datetime

from . import main
from app.model import MainDB

db = MainDB()

@main.route("/api/save_daily", methods=["GET", "POST"])
def save_daily():
    data = request.get_json()
    content = data["content"]
    date = data["date"]    
    
    db.append(content, datetime.strptime(date, "%Y-%m-%d %H:%M:%S"))

    return jsonify(data)