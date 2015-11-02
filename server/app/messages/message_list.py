from flask import Blueprint, jsonify
from model import Message as MessageModel
from flask_jwt import jwt_required, current_user
from app import api
from flask_restful import Resource

message_list_blueprint = Blueprint('message_list_blueprint', __name__)
api.init_app(message_list_blueprint)


class MessageList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        messagelist = []

        for message in MessageModel.list():

            model = {
                'id': message.id,
                'to_user': message.to_user,
                'from_user': message.from_user,
                'type': message.type,
                'read': message.read
            }

            messagelist.append(model)

        return jsonify({'assets': messagelist})



api.add_resource(MessageList, '/api/messages')

