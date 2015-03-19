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

    # TODO Return correct status code
    # TODO Only allow to run if user's do not exist in the database already.

    user_datastore.create_user(
        email='dan@danhill.us',
        password=encrypt_password('123123123'),
        active=1,
    )

    user_datastore.add_role_to_user('dan@danhill.us', 'administrator')

    user_datastore.create_user(email='thirtyseventhirty@gmail.com', password=encrypt_password('123123123'), active=1)
    user_datastore.add_role_to_user('thirtyseventhirty@gmail.com', 'user')

    user_datastore.create_user(
        email='ralphie@boogers.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Ralphie',
        last_name='Wiggim'
    )

    user_datastore.add_role_to_user('ralphie@boogers.com', 'user')

    user_datastore.create_user(
        email='jeff@jeffrules.org',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Jeff',
        last_name='Jambrox'
    )

    user_datastore.add_role_to_user('jeff@jeffrules.org', 'administrator')

    user_datastore.create_user(
        email='finn@adventuremaster.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Finn',
        last_name='The Human'
    )

    user_datastore.add_role_to_user('finn@adventuremaster.com', 'administrator')

    user_datastore.create_user(
        email='jakethedog@adventuremaster.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Jake',
        last_name='The Dog'
    )

    user_datastore.add_role_to_user('jakethedog@adventuremaster.com', 'administrator')

    user_datastore.create_user(
        email='bender@ilovebender.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Bender',
        last_name='Rodriguez'
    )

    user_datastore.add_role_to_user('bender@ilovebender.com', 'administrator')

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

    user = user_datastore.get_user(request.form['username'])
    if user is None:
        print 'User did not exist'
        return redirect(request.args['next'])

    if user.verify_password(request.form['password']):
        login_user(user)

    return redirect(request.args['next'])
