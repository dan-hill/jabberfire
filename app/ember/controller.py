from flask import Blueprint, send_file, send_from_directory, current_app

ember = Blueprint('ember', __name__)


@ember.route('/')
def index():
    return send_file('static/index.html')

@ember.route('/static/<path:filename>')
def send_resource(filename):
    return send_from_directory(current_app.config['static'], filename)
