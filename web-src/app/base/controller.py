from flask import Blueprint, render_template
from app import socket
from flask_security import current_user
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
        html = render_template('base/_main_menu_item.inc',
                               MENU_ITEM_TITLE='Admin')

        socket.emit('response-user-is-admin', {'html': {'admin-menu-entry': html}})


@socket.on('request-current-username')
def response_current_username():
    socket.emit('response-current-username', {'username': current_user.full_name})