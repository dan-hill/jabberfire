from flask import Blueprint, render_template, abort, request
from jinja2 import TemplateNotFound
from .. import app
from .. import models
from flask_security import login_required

auth = Blueprint('auth', __name__, template_folder='templates')

@auth.route('/login')
def show():
    print 'testing'
    if request.method == "GET":
        print "laalallalalala"
    if request.method == "POST":
        print request.form

