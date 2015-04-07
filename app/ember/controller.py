from flask import Blueprint, send_file

ember = Blueprint('ember', __name__)


@ember.route('/')
def index():
    return send_file('static/index.html')