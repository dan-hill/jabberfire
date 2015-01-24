from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

hello_world = Blueprint('hello_world', __name__, template_folder='templates')

@hello_world.route('/', defaults={'page': 'index'})
@hello_world.route('/<page>')
def show(page):
    return render_template('index.html')