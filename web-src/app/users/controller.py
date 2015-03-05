from flask import Blueprint, request, redirect
from flask_security import login_user
from app.users import User
from app import user_datastore

users = Blueprint('users', __name__)


@users.route('/test')
def asd():
    return ' ok'


@users.route('/login', methods=['POST'])
def login():
    user = user_datastore.get_user(request.form['username'])
    login_user(user)
    return redirect(request.args['next'])