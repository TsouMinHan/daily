from flask import Flask

from logging.handlers import SMTPHandler, RotatingFileHandler
from pathlib import Path
import logging
import time
import os

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from app.view import main as view_bp
app.register_blueprint(view_bp)
