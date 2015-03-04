from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound
from flask import current_app

dashboard = Blueprint('dashboard', __name__, template_folder='templates')

@dashboard.route('/dashboard', defaults={'page': 'index'})
def show(page):
    return render_template('../templates/dashboard.html',
                           short_name=current_app.config['ORGANIZATION_SHORT_NAME'])
