from flask import Blueprint, request, jsonify
from model import User as UserModel
from app.messages.model import Message
from app import api
from flask_restful import Resource, abort

access_request_blueprint = Blueprint('access_request_blueprint', __name__)
api.init_app(access_request_blueprint)


class AccessRequest(Resource):

    def post(data):
        json = request.json['accessRequest']

        user = UserModel.find(email=json['email'])

        if user is not None:
            resp = jsonify({
                'status': 409,
                'message': 'Conflict.'
            })
            resp.status_code = 409
            return resp

        user = UserModel(
            email=json['email'],
            firstname=json['firstname'],
            lastname=json['lastname'],
            username=json['firstname'] + '.' + json['lastname'],
            status='pending',
            employee_id=json['employee_id'],
            password=json['password']
        )

        if user.save():
            user = user.find(username=user.username)

            users = UserModel.find(role='administrator')

            for u in users:
                message = Message()
                message.type = 'access-request'
                message.to_user = u


            resp = jsonify({
                'accessRequest': {
                    'id': user.id
                }
            })
            resp.status_code = 201
            return resp

        resp = jsonify({
            'status': 400,
            'message': 'Bad Request.'
        })
        resp.status_code = 400
        return resp

api.add_resource(AccessRequest, '/api/accessRequests')