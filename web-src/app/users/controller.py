""" User controller.

    This module contains all of the route and listeners associated with user focused
    functions.

    Attributes:
      users (Blueprint) The flask blueprint object.

"""

from flask import Blueprint, request, redirect, abort, make_response, jsonify
from flask_security import login_user
from app.users import User
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password

users = Blueprint('users', __name__)


@users.route('/insert-test-data')
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

    return redirect('/')


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
    errors = []

    # Validate first name
    if request.form['username'] is None:
        errors.append({'field': 'username', 'message': 'Username is missing from request.'})

    if request.form['username'] == '':
        errors.append({'field': 'username', 'message': 'Username is required.'})

    # Validate last name
    if request.form['password'] is None:
        errors.append({'field': 'password', 'message': 'Password is missing from request.'})

    if request.form['password'] == '':
        errors.append({'field': 'password', 'message': 'Password is required.'})

    if len(errors) > 0:
        return jsonify(results=errors), 400

    user = user_datastore.find_user(username=request.form['username'])

    if user is None:
        errors.append({'field': 'username', 'message': 'No such user.'})
        return jsonify(results=errors), 400

    if not user.verify_password(request.form['password']):
        errors.append({'field': 'password', 'message': 'Password is incorrect.'})

    if len(errors) > 0:
        return jsonify(results=errors), 400

    if user.status == 'pending':
        errors.append({'field': 'username', 'message': 'You have not yet been approved to access this system.'})

    if user.status == 'rejected':
        errors.append({'field': 'username', 'message': 'Your request was rejected. Please contact support for further information'})

    if user.status == 'inactive':
        errors.append({'field': 'username', 'message': 'Your account has been deactivated. Please contact support for further information,'})
    if len(errors) > 0:
        return jsonify(results=errors), 400

    if user.status == 'active':
        login_user(user)
        return jsonify(results=errors), 200

    abort(500)

@users.route('/request-access', methods=['POST'])
def request_access():
    errors = []

    # Validate first name
    if request.form['first-name'] is None:
        errors.append({'field': 'first-name', 'message': 'First name is missing from request.'})

    if request.form['first-name'] == '':
        errors.append({'field': 'first-name', 'message': 'First name is required.'})

    # Validate last name
    if request.form['last-name'] is None:
        errors.append({'field': 'last-name', 'message': 'Last name is missing from request.'})

    if request.form['last-name'] == '':
        errors.append({'field': 'last-name', 'message': 'Last name is required.'})

    # Validate employee id
    if request.form['employee-id'] is None:
        errors.append({'field': 'employee-id', 'message': 'Employee ID is missing from request.'})

    if request.form['employee-id'] == '':
        errors.append({'field': 'employee-id', 'message': 'Employee ID is required.'})

    # Validate email address
    if request.form['email'] is None:
        errors.append({'field': 'email', 'message': 'Email address is missing from request.'})

    if request.form['email'] == '':
        errors.append({'field': 'email', 'message': 'Email address is required.'})


    if len(errors) > 0:
        return jsonify(results=errors), 400

    username = request.form['first-name'] + '.' + request.form['last-name']

    if user_datastore.find_user(username=username) is not None:
        username = increment_user(username=username)

    if user_datastore.find_user(email=request.form['email']) is not None:
        return abort(make_response('EMAIL IN USE', 400))

    # TODO Additional Validation

    if user_datastore.find_user(username=username) == None:
        user_datastore.create_user(
            email=request.form['email'],
            password=encrypt_password(request.form['password']),
            active=0,
            first_name=request.form['first-name'],
            last_name=request.form['last-name'],
            username=username,
            employee_id=request.form['employee-id']
        )
    print request.args
    return '', 200


def increment_user(username):
    n = 1
    while user_datastore.find_user(username=username + '.' + str(n)) is not None:
            n += 1
    return username + '.' + str(n)


