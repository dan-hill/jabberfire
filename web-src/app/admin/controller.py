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

