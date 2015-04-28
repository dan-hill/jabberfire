
from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from app.roles import Role
from app.departments.model import Department
from flask_jwt import jwt_required, current_user

from app import jwt, api
from flask_restful import  Resource
import random, string
from app.auth import roles_required

user_list_blueprint = Blueprint('user_list_blueprint', __name__)
api.init_app(user_list_blueprint)


class UserList(Resource):

    method_decorators = [jwt_required()]

    def get(self):
        userlist = []

        for user in UserModel.list():

            userroles = []
            for role in current_user.roles:
                userroles.append({
                    'id': role.id,
                    'name': role.name
                })

            departments = []
            for department in user.departments:
                departments.append({
                    'id': department.id,
                    'parent_id': department.parent_id,
                    'name': department.name,
                    'description': department.description
                })

            model = {
                'id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'roles': userroles,
                'departments': departments
            }
            userlist.append(model)
        return jsonify({'users': userlist})

    @roles_required(['administrator'])
    def post(self):
        json = request.json['user']

        user = UserModel(
            firstname=json['firstname'],
            lastname=json['lastname'],
            email=json['email'],
            username=json['firstname'] + '.' + json['lastname'],
            employee_id=json['employee_id'],
            status=json['status'],
            password=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(12))
        )

        for role in json['roles']:
            user.roles.append(Role.find(id=role['id']))

        for department in json['departments']:
            user.departments.append(Department.find(id=department['id']))

        user.save()

        userroles = []
        for role in user.roles:
            userroles.append({
                'id': role.id,
                'name': role.name
            })

        departments = []
        for department in user.departments:
            departments.append({
                'id': department.id,
                'parent_id': department.parent_id,
                'name': department.name,
                'description': department.description
            })

        model = {
            'user': {
                'id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'roles': userroles,
                'departments': departments
            }
        }
        print model
        return jsonify(model), 201

api.add_resource(UserList, '/api/users')

