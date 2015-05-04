from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource

password_token_blueprint = Blueprint('password_token_blueprint', __name__)
api.init_app(password_token_blueprint)


class PasswordToken(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        pass

    def post(self, id):
        pass

    def put(self, id):
        pass

api.add_resource(PasswordToken, '/api/password_token/<int:id>')