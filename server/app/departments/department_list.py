from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Department as DepartmentModel
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource
from app.auth import roles_required

department_list_blueprint = Blueprint('department_list_blueprint', __name__)
api.init_app(department_list_blueprint)


class DepartmentList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        departmentlist = []

        for department in DepartmentModel.list():
            children = []
            for child in department.children:
                children.append({
                    'id': child.id,
                    'parent_id': child.parent_id,
                    'name': child.name,
                    'description': child.description,

                })

            model = {
                'id': department.id,
                'parent_id': department.parent_id,
                'name': department.name,
                'description': department.description,
                'children': children
            }

            departmentlist.append(model)

        return jsonify({'departments': departmentlist})

    @roles_required(['administrator'])
    def post(self):
        json = request.json['department']

        department = DepartmentModel(
            name=json['name'],
            description=json['description'],
            parent_id=json['parent_id'],
            id=json['id']
        )

        department.save()

        model = {
            'department': {
                'id': department.id,
                'name': department.name,
                'description': department.description,
                'parent_id': department.parent_id
            }
        }

        print model
        return jsonify(model), 201

api.add_resource(DepartmentList, '/api/departments')
