from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource

user_blueprint = Blueprint('user_blueprint', __name__)
api.init_app(user_blueprint)


class User(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        userroles = []
        user = db.session.query(UserModel).get(id)

        for role in user.roles:
            userroles.append(role.id)

        model = {
            'user': {
                'id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'roles': userroles
            }
        }
        return jsonify(model)

    def post(data):
        # TODO Add protection against insufficient permissions
        if UserModel.find(email=data['email']) is None:
            user = UserModel(
                email=data['email'],
                password=data['password'],
                first_name=data['first-name'],
                last_name=data['last-name'],
                status=data['status']
            )

            user.add_role('user')
            user.save()


def increment_user(username):
    n = 1
    while UserModel.find(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)

api.add_resource(User, '/api/users/<int:id>')

