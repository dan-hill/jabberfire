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

force_blueprint = Blueprint('force_blueprint', __name__)
api.init_app(force_blueprint)


class Force(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):
        user = User.find(id=id)
        user.password = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(32))
        user.save()

        token = PasswordToken()
        token._token = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(32))
        token.user_id = user.id
        token.save()

        msg = Message()
        msg.html = render_template('force_email.html', token=token._token)
        msg.recipients = [user.email]
        msg.subject = 'Action Required: CCMA Password Reset'

        mail.send(msg)

        return '', 200

    def post(self, id):
        pass

    def put(self, id):
        pass

api.add_resource(Force, '/api/password/force/<int:id>')