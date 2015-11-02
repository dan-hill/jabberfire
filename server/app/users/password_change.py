from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import User as UserModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource

password_change_blueprint = Blueprint('password_change_blueprint', __name__)
api.init_app(password_change_blueprint)


class PasswordChange(Resource):

    def get(self, password_token):
        pass

    def post(self, password_token):
        pass

    def put(self, password_token):
        pass

api.add_resource(PasswordChange, '/api/password/<password_token>')