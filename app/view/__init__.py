from flask import Blueprint, url_for

main = Blueprint('main', __name__)

from . import daily