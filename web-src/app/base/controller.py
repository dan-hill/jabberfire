from flask import Blueprint
from app import socket
from flask_security import current_user, roles_required

base = Blueprint('base', __name__)

@socket.on('request-admin-menu')
def respond_admin_menu():
    print current_user.roles.list