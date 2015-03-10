from flask import Blueprint, render_template
from app import socket
from flask_security import current_user
from app.users.user import User
from app.departments.model import Department
import json
import pprint

admin = Blueprint('admin', __name__)


@admin.route('/admin')
def admin_main():
    return render_template('admin/admin.html')

def get_tree(base_department, tree_dict):

    # TODO Protect this function from accidental infinite recurrsion.

    tree_dict = {}

    tree_dict['id'] = base_department.id
    tree_dict['text'] = base_department.name
    tree_dict['icon state'] = {'opened': False, 'disabled': False, 'selected': False}
    tree_dict['children'] = []
    tree_dict['li_attr'] = {}
    tree_dict['a_attr'] = {}

    children = base_department.sub_departments

    if len(children) > 0:
        for child in children:
            tree_dict['children'].append(get_tree(child, tree_dict))

    return tree_dict

@admin.route('/admin/user-management')
def admin_user_management():

    for department in Department.list():
        if not department.parent_id:
            pprint.pprint(get_tree(department, {}))

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