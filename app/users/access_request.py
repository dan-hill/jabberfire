from flask import Blueprint, request, abort
from model import User as UserModel
from app import api
from flask_restful import Resource

access_request_blueprint = Blueprint('access_request_blueprint', __name__)
api.init_app(access_request_blueprint)


class AccessRequest(Resource):

    def post(data):
        json = request.json['accessRequest']

        user = UserModel.find(email=json['email'])

        if user is not None:
            abort(400)

        user = UserModel(
            email=json['email'],
            firstname=json['firstname'],
            lastname=json['lastname'],
            status='pending',
            employee_id=json['employee_id'],
            password=json['password']
        )

        user.save()



api.add_resource(AccessRequest, '/api/accessRequests')

