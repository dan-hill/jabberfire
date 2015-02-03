from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

auth = Blueprint('auth', __name__, template_folder='templates')


@auth.route('/login', defaults={'page': 'index'})
def show(page):
    return render_template('login.html')