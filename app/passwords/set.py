from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from flask_jwt import jwt_required
from app import jwt, api, db
from flask_restful import Resource
from app.users import User
import string
import random
from app import mail
from flask_mail import Message
from model import PasswordToken
from app.users import User

set_new_password_blueprint = Blueprint('set_new_password_blueprint', __name__)
api.init_app(set_new_password_blueprint)


class SetNewPassword(Resource):

    def get(self):
        return '', 200

    def post(self):
        print request.json['token']
        token = PasswordToken.find(_token=request.json['token'])
        if token is not None:
            user = User.find(id=token.user_id)

            user.password = request.json['password']
            return '', 200
        abort(400)

    def put(self):
        pass

api.add_resource(SetNewPassword, '/api/password/reset')