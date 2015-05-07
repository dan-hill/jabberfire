from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Activity
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource
import dateutil.parser

activities_blueprint = Blueprint('activities_blueprint', __name__)
api.init_app(activities_blueprint)


class Activities(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        activities = []
        for activity in Activity.list():
            activities.append({
                'id': activity.id,
                'work_order': activity.work_order_id,
                'date': activity.date,
                'type': activity.type,
                'note': activity.note
            })

        return jsonify({'activities': activities})

    def post(self):
        json = request.json['activity']
        print dateutil.parser.parse(json['date'])

        activity = Activity(
            user_id=json['user'],
            work_order=json['work_order'],
            date=dateutil.parser.parse(json['date']),
            type=json['type'],
            note=json['note']
        )

        if not activity.save():
            abort(400)

        model = {
            'activity': {
                'id': activity.id,
                'work-order': activity.work_order_id,
                'user': activity.user_id,
                'date': activity.date.isoformat(),
                'type': activity.type
            }
        }
        print model
        return jsonify(model)

api.add_resource(Activities, '/api/activities')