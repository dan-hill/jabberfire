from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

dashboard = Blueprint('dashboard', __name__, template_folder='templates')

@dashboard.route('/dashboard', defaults={'page': 'index'})
def show(page):
    return render_template('dashboard.html')