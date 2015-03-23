from flask import Blueprint, render_template
from app import socket
from flask_security import current_user
from flask_security.utils import encrypt_password
from app.users.model import User
from app.departments.model import Department
from app import user_datastore

admin = Blueprint('admin', __name__)


@admin.route('/admin')
def admin_main():
    return render_template('admin/admin.inc')

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

    # TODO Document this function. It is unclear what I was doing here.

    return render_template(
        'admin/user_management.inc',
        USERS=User.list())

@socket.on('request-user-list')
def respond_user_list():
    print 'Got request for user list.'
    for user in User.list():
        html = render_template('admin/user_list_item.inc',
                               fullname=user.full_name,
                               username=user.username,
                               status=user.status)
        socket.emit('response-user-list', {'username':user.username, 'html': html})

@socket.on('request-admin-menu')
def respond_admin_menu():

    # TODO The role restriction code needs to be built into it's own function. Preferably a decorator.

    required_roles = ['administrator']
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


@socket.on('add-user')
def add_user(data):

    # TODO Add protection against insufficient permissions

    user_datastore.create_user(
        email=data['email'],
        password=encrypt_password(data['password']),
        active=1,
        first_name=data['first-name'],
        last_name=data['last-name']
    )

    user_datastore.add_role_to_user(data['email'], 'user')