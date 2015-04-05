
from flask import Blueprint, send_file, request, redirect, abort, make_response, jsonify, render_template,g
from flask_security import login_user
from app.users import User as UserModel
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password
from flask_jwt import jwt_required, current_user
from app import api, jwt, db
from flask_restful import Api, Resource, url_for



user = Blueprint('user', __name__)
c_user = Blueprint('c_user', __name__)

api.init_app(user)
api.init_app(c_user)


@user.route('/')
def indffex():
    return send_file('static/index.html')

class User(Resource):
    def get(self, id):
        userroles = []
        user = db.session.query(UserModel).get(id)

        for role in user.roles:
            userroles.append(role.id)

        model = {
            'user': {
                'id': user.id,
                'firstname': user.first_name,
                'lastname': user.last_name,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'roles': userroles
            }
        }
        return jsonify(model)

class CurrentUser(Resource):

    @jwt_required()
    def get(self):
        userroles = []
        for role in current_user.roles:
            userroles.append(role.id)

        model = {
            'user': {
                'id': current_user.id,
                'firstname': current_user.first_name,
                'lastname': current_user.last_name,
                'email': current_user.email,
                'username': current_user.username,
                'employee_id': current_user.employee_id,
                'status': current_user.status,
                'roles': userroles
            }
        }
        return jsonify(model)





def increment_user(username):
    n = 1
    while user_datastore.find_user(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)


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
    else:
        print 'UserModel already in existance.'


def respond_user_list():
    print 'Got request for user list.'
    for user in UserModel.list():
        html = render_template('admin/user_list_item.inc',
                               fullname=user.full_name,
                               username=user.username,
                               status=user.status)


@jwt.authentication_handler
def authenticate(username, password):
    user = user_datastore.find_user(username=username)
    print 'authenticating'
    if user is not None:
        if user.verify_password(password):
            return user

@jwt.user_handler
def load_user(payload):
    user = user_datastore.find_user(id=payload['user_id'])
    return user


api.add_resource(User, '/users/<int:id>')
api.add_resource(CurrentUser, '/users/me')

