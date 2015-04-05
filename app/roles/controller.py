from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from flask_security import login_user
from app.roles.role import Role as RoleModel

from app import user_datastore
from flask_security.utils import encrypt_password
from flask_jwt import jwt_required, current_user

from app import api, jwt
from flask_restful import Api, Resource, url_for
from app import db

role_bp = Blueprint('role', __name__)
api.init_app(role_bp)

role_list_bp = Blueprint('role_list', __name__)
api.init_app(role_list_bp)

class RoleList(Resource):
    def get(self):
        roles = []
        for role in RoleModel.list():
            model = {
                    'id': role.id,
                    'name': role.name
            }
            roles.append(model)
        return jsonify({'roles': roles})

class Role(Resource):
    def get(self, id):

        role = db.session.query(RoleModel).get(id)
        model = {
            'role': {
                'id': role.id,
                'name': role.name
            }
        }
        print model
        return jsonify(model)




@jwt.error_handler
def error_handler(e):
    return "Unauthorized", 401


api.add_resource(Role, '/roles/<int:id>')
api.add_resource(RoleList, '/roles')