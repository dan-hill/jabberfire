from flask import Blueprint, redirect
from flask_security.utils import encrypt_password
from app.users.model import User
from app.departments.model import Department
from app import user_datastore
import csv, os

testing = Blueprint('testing', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

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

def increment_user(username):
    n = 1
    while user_datastore.find_user(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)

def insert_users():
    reader = csv.reader(open(os.path.join(__location__, 'users.csv')), delimiter=',', quotechar='"')
    for row in reader:
        print row
        username = (row[0] + '.' + row[1]).lower()

        if user_datastore.find_user(username=username) is not None:
            username = increment_user(username=username)

        if user_datastore.find_user(username=username) is None:
            user_datastore.create_user(
                email=row[2],
                password=encrypt_password(row[3]),
                status=row[6],
                first_name=row[0],
                last_name=row[1],
                username=username,
                employee_id=row[4]
            )

            user_datastore.add_role_to_user(
                row[2],
                'administrator'
            )
    # Insert the users




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