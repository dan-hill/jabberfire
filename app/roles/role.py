from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from app.roles.model import Role as RoleModel
from app import api, jwt
from flask_restful import Api, Resource, url_for
from flask_jwt import jwt_required
from app import db

role_blueprint = Blueprint('role_blueprint', __name__)
api.init_app(role_blueprint)

class Role(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):

        role = db.session.query(RoleModel).filter_by(id=id).first()
        model = {
            'role': {
                'id': role.id,
                'name': role.name
            }
        }
        return jsonify(model)

api.add_resource(Role, '/roles/<int:id>')
