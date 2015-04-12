from flask import Blueprint, jsonify
from model import Activity as ActivityModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

activity_blueprint = Blueprint('activity_blueprint', __name__)
api.init_app(activity_blueprint)


class Activity(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):
        activity = ActivityModel.find(id=id)

        model = {
            'activity': {
                'id': activity.id,
                'description': activity.description,
                'reason': activity.reason,
                'approved': activity.approved,
                'note': activity.note,
                'unit': activity.unit_id,
                'user_department_id': activity.user_department_id
            }
        }
        return jsonify(model)

    def post(data):
        # TODO Add protection against insufficient permissions
        if ActivityModel.find() is None:
            activity = ActivityModel()

            activity.add_role('activity')
            activity.save()

api.add_resource(Activity, '/api/activitys/<int:id>')