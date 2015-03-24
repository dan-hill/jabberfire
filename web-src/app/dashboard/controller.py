from flask import Blueprint, render_template, abort, redirect
from jinja2 import TemplateNotFound
from flask_security import login_required, current_user
from app import socket

dashboard = Blueprint('dashboard', __name__)


@dashboard.route('/')
@login_required
def root_path():
    return redirect('/dashboard', code=302)

@dashboard.route('/dashboard', defaults={'page': 'index'})
@login_required
def show(page):
    return render_template('dashboard.inc')


@socket.on('blah')
def blah():
    print 'some blah'