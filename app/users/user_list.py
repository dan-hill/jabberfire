
from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from model import user_datastore
from flask_security.utils import encrypt_password
from flask_jwt import jwt_required, current_user

from app import jwt, api
from flask_restful import  Resource

user_list = Blueprint('user_list', __name__)

api.init_app(user_list)


class UserList(Resource):

    method_decorators = [jwt_required()]

    def get(self):
        userlist = []

        for user in UserModel.list():
            userroles = []
            for role in user.roles:
                userroles.append(role.id)
            model = {

                    'id': user.id,
                    'firstname': user.first_name,
                    'lastname': user.last_name,
                    'email': user.email,
                    'username': user.username,
                    'employee_id': user.employee_id,
                    'status': user.status,
                    'roles': userroles
            }
            userlist.append(model)
        return jsonify({'users': userlist})

    def post(self):
        json = request.json['user']
        user = UserModel()
        user.first_name = json['firstname']
        user.last_name = json['lastname']
        user.email = json['email']
        user.employee_id = json['employee_id']
        print json['roles']
        return '', 400

api.add_resource(UserList, '/users')

