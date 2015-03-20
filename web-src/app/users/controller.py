""" User controller.

    This module contains all of the route and listeners associated with user focused
    functions.

    Attributes:
      users (Blueprint) The flask blueprint object.

"""

from flask import Blueprint, request, redirect
from flask_security import login_user
from app.users import User
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password

users = Blueprint('users', __name__)


@users.route('/testuser')
def create_test_user():
    """
    Populates the database with test user data.

    Returns:
        (string) OK
    """

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

    # TODO Return correct status code
    # TODO Only allow to run if user's do not exist in the database already.


    user_datastore.create_user(
        email='dan@danhill.us',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Dan',
        last_name='Hill',
        username='dan.hill'
    )

    user_datastore.add_role_to_user(
        'dan@danhill.us',
        'administrator'
    )

    return 'ok'


@users.route('/login', methods=['POST'])
def login():
    """
    Authenticats a user and begins a session.

    Methods:
      POST

    Route:
      /login

    Form Args:
      username (string) The user's username
      password (stirng) The user's plaintext password.

    Status Codes:
        302 OK: The login was successful. Redirects to origin page.
    """

    user = user_datastore.find_user(username=request.form['username'])
    if user is None:
        print 'User did not exist'
        return redirect(request.args['next'])

    if user.verify_password(request.form['password']):
        login_user(user)

    return redirect(request.args['next'])
