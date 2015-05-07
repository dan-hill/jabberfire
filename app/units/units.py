from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Unit as UnitModel
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource

units_blueprint = Blueprint('units_blueprint', __name__)
api.init_app(units_blueprint)


class Units(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        units = []
        for unit in UnitModel.list():
            units.append({
                'id': unit.id,
                'status': unit.status,
                'tag': unit.tag,
                'note': unit.note,
                'purchace_cost': unit.purchase_cost,
                'warranty_expiration': unit.warranty_expiration,
                'end_of_life': unit.end_of_life,
                'asset': unit.asset_id,
            })

        return jsonify({'units': units})

    def post(self):
        pass

api.add_resource(Units, '/api/units')