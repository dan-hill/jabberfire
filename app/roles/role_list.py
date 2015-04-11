from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from app.roles.model import Role as RoleModel
from app import api, jwt
from flask_restful import Api, Resource, url_for
from app import db

role_list_blueprint = Blueprint('role_list_blueprint', __name__)
api.init_app(role_list_blueprint)

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

api.add_resource(RoleList, '/api/roles')