from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import WorkOrder
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource

work_orders_blueprint = Blueprint('work_orders_blueprint', __name__)
api.init_app(work_orders_blueprint)


class WorkOrders(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        work_orders = []

        activities = []
        for work_order in WorkOrder.list():
            for activity in work_order.activities:
                activities.append(activity.id)

            unit = ''
            if work_order.unit is not None:
                unit = {
                    'id':  work_order.unit.id,
                    'status':  work_order.unit.status,
                    'tag':  work_order.unit.tag,
                    'purchase_cost':  work_order.unit.purchase_cost,
                    'warranty_expiration':  work_order.unit.warranty_expiration,
                    'end_of_life': work_order.unit.end_of_life,
                    'asset':  work_order.unit.asset_id,
                    'asset_id':  work_order.unit.asset_id
                }

            work_orders.append({
                'id': work_order.id,
                'department': work_order.department_id,
                'user': work_order.user_id,
                'asset': work_order.asset_id,
                'activities': activities,
                'fulfilled': work_order.fufilled,
                'unit': unit
            })


        return jsonify({'workOrders': work_orders})

    def post(self):
        json = request.json['workOrder']
        print json

        work_order = WorkOrder(
            department_id=json['department'],
            user_id=json['user'],
            asset_id=json['asset']
        )

        if not work_order.save():
            abort(400)

        unit = ''
        if work_order.unit is not None:
            unit = {
                'id':  work_order.unit.id,
                'status':  work_order.unit.status,
                'tag':  work_order.unit.tag,
                'purchase_cost':  work_order.unit.purchase_cost,
                'warranty_expiration':  work_order.unit.warranty_expiration,
                'end_of_life': work_order.unit.end_of_life,
                'asset':  work_order.unit.asset_id,
                'asset_id':  work_order.unit.asset_id
            }
        model = {
            'workOrder': {
                'id': work_order.id,
                'department': work_order.department_id,
                'user': work_order.user_id,
                'asset': work_order.asset_id,
                'fulfilled': work_order.fufilled,
                'unit': unit
            }
        }
        print model
        return jsonify(model)

api.add_resource(WorkOrders, '/api/workOrders')