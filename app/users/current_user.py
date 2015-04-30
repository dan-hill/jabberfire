
from flask import Blueprint, send_file, request, redirect, abort, make_response, jsonify, render_template,g

from flask_jwt import jwt_required, current_user
from app import api
from flask_restful import Api, Resource, url_for

current_user_blueprint = Blueprint('current_user_blueprint', __name__)
api.init_app(current_user_blueprint)


class CurrentUser(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        userroles = []
        print current_user
        for role in current_user.roles:
            userroles.append({
                'id': role.id,
                'name': role.name
            })

        messages = []
        for message in current_user.messages:
            messages.append(message.id)

        model = {
            'user': {
                'id': current_user.id,
                'user_id': current_user.id,
                'firstname': current_user.firstname,
                'lastname': current_user.lastname,
                'email': current_user.email,
                'username': current_user.username,
                'employee_id': current_user.employee_id,
                'status': current_user.status,
                'roles': userroles,
                'messages': messages
            }
        }
        return jsonify(model)


api.add_resource(CurrentUser, '/api/users/me')
