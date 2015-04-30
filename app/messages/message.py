from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Message as MessageModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource

message_blueprint = Blueprint('message_blueprint', __name__)
api.init_app(message_blueprint)


class Message(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        message = MessageModel.find(id=id)

        model = {
            'message': {
                'id': message.id,
                'type': message.type,
                'from_user': message.from_user_id,
                'to_user': message.to_user_id
            }
        }
        return jsonify(model)

    def post(data):
        pass

api.add_resource(Message, '/api/messages/<int:id>')
