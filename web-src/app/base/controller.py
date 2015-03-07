from flask import Blueprint
from app import socket
from flask_security import current_user
from app import user_datastore
from flask import current_app
base = Blueprint('base', __name__)




@socket.on('request-admin-menu')
def respond_admin_menu():
    required_roles = ['admin']
    user_roles = []
    for role in current_user.roles:
        user_roles.append(role.name)

    user_role_set = set(user_roles)
    required_roles_set = set(required_roles)

    if required_roles_set.issubset(user_role_set):
        print 'this user is allowed'
    else:
        print 'user not an admin'


