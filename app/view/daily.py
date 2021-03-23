from flask import request, jsonify, render_template, url_for

from datetime import datetime

from . import main
from app.model import MainDB

db = MainDB()

@main.route("/api/save_daily", methods=["GET", "POST"])
def save_daily():
    data = request.get_json()
    content = data["content"]
    timestamp = data["timestamp"]
    
    db.append(content, datetime.fromtimestamp(timestamp))

    return jsonify(data)

@main.route("/", methods=["GET"])
@main.route("/daily", methods=["GET"])
def daily_index():
    return render_template("index.html")