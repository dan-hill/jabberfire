from flask import Blueprint, render_template
from app import socket
from flask_security import current_user
from app.users.user import User

admin = Blueprint('admin', __name__)


@admin.route('/admin')
def admin_main():
    return render_template('admin/admin.html')

@admin.route('/admin/user-management')
def admin_user_management():
    return render_template(
        'admin/user_management.inc',
        USERS=User.list())

@socket.on('request-admin-menu')
def respond_admin_menu():
    required_roles = ['admin']
    user_roles = []
    for role in current_user.roles:
        user_roles.append(role.name)

    user_role_set = set(user_roles)
    required_roles_set = set(required_roles)

    if required_roles_set.issubset(user_role_set):
        html = render_template('admin/_admin_sidebar_menu_entry.inc',
                               TARGET='javascript:;',
                               MENU_ITEM_TITLE='Admin',
                               HAS_SUBMENU=True)

        socket.emit('response-user-is-admin', {'html': {'admin-menu-entry': html}})