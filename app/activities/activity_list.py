from flask import Blueprint, jsonify
from model import Activity as ActivityModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

activity_list_blueprint = Blueprint('activity_list_blueprint', __name__)
api.init_app(activity_list_blueprint)


class ActivityList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        activitylist = []

        for activity in ActivityModel.list():

            model = {
                'id': activity.id,
                'description': activity.description,
                'reason': activity.reason,
                'approved': activity.approved,
                'note': activity.note,
                'unit': activity.unit_id,
                'user_department_id': activity.user_department_id

            }

            activitylist.append(model)

        return jsonify({'activitys': activitylist})



api.add_resource(ActivityList, '/api/activitys')
