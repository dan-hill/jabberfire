from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Department as DepartmentModel
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource

department_list_blueprint = Blueprint('department_list_blueprint', __name__)
api.init_app(department_list_blueprint)


class DepartmentList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        departmentlist = []

        for department in DepartmentModel.list():
            children = []
            for child in department.children:
                children.append(child.id)

            model = {
                'id': department.id,
                'parent_id': department.description,
                'name': department.reason,
                'description': department.approved,
                'children': children
            }

            departmentlist.append(model)

        return jsonify({'departments': departmentlist})



api.add_resource(DepartmentList, '/api/departments')
