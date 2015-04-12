# from flask import Blueprint, jsonify
# from model import Department as DepartmentModel
# from flask_jwt import jwt_required
# from app import api
# from flask_restful import Resource
#
# department_blueprint = Blueprint('department_blueprint', __name__)
# api.init_app(department_blueprint)
#
#
# class Department(Resource):
#
#     method_decorators = [jwt_required()]
#
#     def get(self, id):
#         department = DepartmentModel.find(id=id)
#         children = []
#
#         for child in department.children:
#             children.append(child.id)
#
#         model = {
#             'department': {
#                 'id': department.id,
#                 'parent_id': department.description,
#                 'name': department.reason,
#                 'description': department.approved,
#                 'children': children
#             }
#         }
#         return jsonify(model)
#
#     def post(data):
#         # TODO Add protection against insufficient permissions
#         if DepartmentModel.find() is None:
#             department = DepartmentModel()
#
#             department.add_role('department')
#             department.save()
#
# api.add_resource(Department, '/api/departments/<int:id>')