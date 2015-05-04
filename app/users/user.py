from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource
from app.departments.model import Department
user_blueprint = Blueprint('user_blueprint', __name__)
api.init_app(user_blueprint)

class User(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        user = db.session.query(UserModel).get(id)

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
                'user_id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'role': user.role,
                'departments': departments
            }
        }
        return jsonify(model)

    def put(self, id):
        json = request.json['user']
        print json
        user = UserModel.find(id=id)
        user.email = json['email']
        user.role = json['role']
        user.employee_id = json['employee_id']
        user.status = json['status']
        user.departments = []
        for department in json['departments']:
            user.departments.append(Department.find(id=department['id']))


        user.save()

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
                'user_id': user.id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'username': user.username,
                'employee_id': user.employee_id,
                'status': user.status,
                'role': user.role,
                'departments': departments
            }
        }

        return jsonify(model)
api.add_resource(User, '/api/users/<int:id>')

