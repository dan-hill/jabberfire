""" User controller.

    This module contains all of the route and listeners associated with user focused
    functions.

    Attributes:
      users (Blueprint) The flask blueprint object.

"""

from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from flask_security import login_user
from app.users import User
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password, verify_password
from app import jwt
from flask_jwt import jwt_required, current_user
from app import socket

users = Blueprint('users', __name__)



messages = {
    'missing-first-name': 'First name is missing from request.',
    'empty-first-name': 'First name is required.',
    'missing-last-name': 'Last name is missing from request.',
    'empty-last-name': 'Last name is required.',
    'missing-employee-id': 'Employee ID is missing from request.',
    'empty-employee-id': 'Employee ID is required.',
    'missing-email-address': 'Email address is missing from request.',
    'empty-email-address': 'Email address is required.',
    'missing-password': 'Password is missing from the request',
    'empty-password': 'Password is required.',
    'password-mismatch': 'Passwords must match.',
    'tnc-off': 'You must accept the Terms of Service.',
    'email-address-taken': 'Email address is already associated with an account.'
}


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
        errors.append({'field': 'username',
                       'message': 'Your request was rejected. Please contact support for further information'})

    if user.status == 'inactive':
        errors.append({'field': 'username',
                       'message': 'Your account has been deactivated. Please contact support for further information,'})
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
        errors.append({
            'field': 'first-name',
            'message': messages['missing-first-name']})

    if request.form['first-name'] == '':
        errors.append({
            'field': 'first-name',
            'message': messages['empty-first-name']})

    # Validate last name
    if request.form['last-name'] is None:
        errors.append({
            'field': 'last-name',
            'message': messages['missing-last-name']})

    if request.form['last-name'] == '':
        errors.append({
            'field': 'last-name',
            'message': messages['empty-last-name']})

    # Validate employee id
    if request.form['employee-id'] is None:
        errors.append({
            'field': 'employee-id',
            'message': messages['missing-employee-id']})

    if request.form['employee-id'] == '':
        errors.append({
            'field': 'employee-id',
            'message': messages['empty-employee-id']})

    # Validate email address
    if request.form['email'] is None:
        errors.append({
            'field': 'email',
            'message': messages['missing-email-address']})

    if request.form['email'] == '':
        errors.append({
            'field': 'email',
            'message': messages['empty-email-address']})

    # Validate email address
    if request.form['password'] is None:
        errors.append({
            'field': 'password',
            'message': messages['missing-password']})

    if request.form['password'] == '':
        errors.append({
            'field': 'password',
            'message': messages['empty-password']})

    if not (request.form['password'] == request.form['confirm-password']):
        errors.append({
            'field': 'confirm-password',
            'message': messages['password-mismatch']})

    if 'tnc' not in request.form:
        errors.append({
            'field': 'tnc',
            'message': messages['tnc-off']})

    if len(errors) > 0:
        return jsonify(results=errors), 400

    username = (request.form['first-name'] + '.' + request.form['last-name']).lower()

    if user_datastore.find_user(username=username) is not None:
        username = increment_user(username=username)

    if user_datastore.find_user(email=request.form['email']) is not None:
        errors.append({
            'field': 'email',
            'message': messages['email-address-taken']})
        return jsonify(results=errors), 400

    # TODO Additional Validation based on organizational rule defined in the settings.

    if user_datastore.find_user(username=username) == None:
        user_datastore.create_user(
            email=request.form['email'],
            password=encrypt_password(request.form['password']),
            first_name=request.form['first-name'],
            last_name=request.form['last-name'],
            username=username,
            employee_id=request.form['employee-id']
        )

    return '', 200


def increment_user(username):
    n = 1
    while user_datastore.find_user(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)


@socket.on('add-user')
def add_user(data):
    # TODO Add protection against insufficient permissions
    if user_datastore.find_user(email=data['email']) is None:
        user_datastore.create_user(
            email=data['email'],
            password=encrypt_password(data['password']),
            first_name=data['first-name'],
            last_name=data['last-name'],
            status=data['status']
        )

        user_datastore.add_role_to_user(data['email'], 'user')

        user = user_datastore.find_user(email=data['email'])
        html = render_template('admin/user_list_item.inc',
                               fullname=user.full_name,
                               username=user.username,
                               status=user.status)
        socket.emit('response-user-list', {'username': user.username, 'html': html})
    else:
        print 'User already in existance.'


@socket.on('request-user-list')
def respond_user_list():
    print 'Got request for user list.'
    for user in User.list():
        html = render_template('admin/user_list_item.inc',
                               fullname=user.full_name,
                               username=user.username,
                               status=user.status)
        socket.emit('response-user-list', {'username': user.username, 'html': html})


@jwt.authentication_handler
def authenticate(username, password):
    user = user_datastore.find_user(username=username)
    if user is not None:
        if user.verify_password(password):
            return user

@jwt.user_handler
def load_user(payload):
    user = user_datastore.find_user(id=payload['user_id'])
    return user

@users.route('/users', methods=['GET', 'POST'])
@jwt_required()
def users_route():
    userlist = []
    for user in User.list():
        model = {

                'id': user.id,
                'firstname': user.first_name,
                'lastname': user.last_name,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,

        }
        userlist.append(model)

    return jsonify({'users': userlist})


@users.route('/users/me', methods=['GET'])
@jwt_required()
def users_me():
    user_roles = []
    for role in current_user.roles:
        user_roles.append({'role': role.name})

    model = {
        'user': {
            'id': current_user.id,
            'firstname': current_user.first_name,
            'lastname': current_user.last_name,
            'email': current_user.email,
            'username': current_user.username,
            'employee_id': current_user.employee_id,
            'status': current_user.status,
            'roles': user_roles
        }
    }
    return jsonify(model)

