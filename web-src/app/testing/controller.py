from flask import Blueprint, redirect
from flask_security.utils import encrypt_password
from app.users.model import User
from app.departments.model import Department
from app import user_datastore

testing = Blueprint('testing', __name__)

def insert_roles():
    # Insert the roles
    if not user_datastore.find_role('user'):
        user_datastore.create_role(
            name='user',
            description='Generic role'
        )

    if not user_datastore.find_role('technician'):
        user_datastore.create_role(
            name='technician',
            description='Technician role'
        )

    if not user_datastore.find_role('administrator'):
        user_datastore.create_role(
            name='administrator',
            description='Administrator role'
        )


def insert_users():
    # Insert the users
    if user_datastore.find_user(username='dan.hill') == None:
        user_datastore.create_user(
            email='dan@danhill.us',
            password=encrypt_password('123123123'),
            status='active',
            first_name='Dan',
            last_name='Hill',
            username='dan.hill',
            employee_id='Ji1SNFbcv4'
        )

        user_datastore.add_role_to_user(
            'dan@danhill.us',
            'administrator'
        )

    if user_datastore.find_user(username='tunde.oladipupo') == None:
        user_datastore.create_user(
            email='tunde.oladipupo@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Tunde',
            last_name='Oladipupo',
            username='tunde.oladipupo',
            employee_id='ii6ZitQNXz'
        )

        user_datastore.add_role_to_user(
            'tunde.oladipupo@cameron.edu',
            'administrator'
        )

    if user_datastore.find_user(username='jacob.aldava') == None:
        user_datastore.create_user(
            email='jacob.aldava@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Jacob',
            last_name='Aldava',
            username='jacob.aldava',
            employee_id='3aMwU9ajL9'
        )

        user_datastore.add_role_to_user(
            'jacob.aldava@cameron.edu',
            'administrator'
        )

    if user_datastore.find_user(username='walter.angeles') == None:
        user_datastore.create_user(
            email='walter.angeles@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Walter',
            last_name='Angeles',
            username='walter.angeles',
            employee_id='PvgYaTjEHH'
        )

        user_datastore.add_role_to_user(
            'walter.angeles@cameron.edu',
            'administrator'
        )

    if user_datastore.find_user(username='aldrick.biscette') == None:
        user_datastore.create_user(
            email='aldrick.biscette@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Aldrick',
            last_name='Biscette',
            username='aldrick.biscette',
            employee_id='TPbkwqfbEL'
        )

        user_datastore.add_role_to_user(
            'aldrick.biscette@cameron.edu',
            'administrator'
        )

    if user_datastore.find_user(username='odie.freeman') == None:
        user_datastore.create_user(
            email='odie.freeman@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Odie',
            last_name='Freeman',
            username='odie.freeman',
            employee_id='ikuPEWkvX4'
        )

        user_datastore.add_role_to_user(
            'odie.freeman@cameron.edu',
            'administrator'
        )

    if user_datastore.find_user(username='bishaka.karki') == None:
        user_datastore.create_user(
            email='bishaka.karki@cameron.edu',
            password=encrypt_password('123123123'),
            first_name='Bishaka',
            last_name='Karki',
            username='bishaka.karki',
            employee_id='ggNw7zEFds'
        )

        user_datastore.add_role_to_user(
            'bishaka.karki@cameron.edu',
            'administrator'
        )

@testing.route('/insert-test-data')
def create_test_user():
    """
    Populates the database with test user data.

    Returns:
        (string) OK
    """
    insert_roles()
    insert_users()
    return redirect('/')