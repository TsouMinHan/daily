from flask import request, jsonify, render_template, url_for, session

from datetime import datetime

from . import main
from app.model import MainDB

db = MainDB()

@main.route("/api/load_daily", methods=["GET", "POST"])
def load_daily():
    res = {
        "status": "success",
        "dailys": db.read()
        }
    return jsonify(res)

@main.route("/api/save_daily", methods=["GET", "POST"])
def save_daily():
    data = request.get_json()
    content = data["content"]
    timestamp = data["timestamp"]
    
    try:
        db.append(content, datetime.fromtimestamp(timestamp))
        res = {"status": "success"}
    except:
        res = {"status": "failed"}

    return jsonify(res)

@main.route("/", methods=["GET"])
@main.route("/daily", methods=["GET"])
def daily_index():    
    return render_template("index.html")