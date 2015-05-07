from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Unit as UnitModel
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource
from app.auth import roles_required
units_blueprint = Blueprint('units_blueprint', __name__)
api.init_app(units_blueprint)
import dateutil.parser
from app.assets import Asset

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
                'purchase_cost': unit.purchase_cost,
                'warranty_expiration': unit.warranty_expiration,
                'end_of_life': unit.end_of_life,
                'asset': unit.asset_id,
            })

        return jsonify({'units': units})

    @roles_required(['administrator'])
    def post(self):
        json = request.json['unit']
        print json
        unit = UnitModel(
            status=json['status'],
            tag=json['tag'],
            purchase_cost=json['purchase_cost'],
            warranty_expiration=dateutil.parser.parse(json['warranty_expiration']),
            end_of_life=dateutil.parser.parse(json['end_of_life']))

        unit.asset = Asset.find(id=json['asset'])
        unit.save()

        model = {
            'unit': {
                'id': unit.id,
                'status': unit.status,
                'tag': unit.tag,
                'purchase_cost': unit.purchase_cost,
                'warranty_expiration': unit.warranty_expiration,
                'end_of_life': unit.end_of_life,
                'asset': unit.asset_id,
                'asset_id': unit.asset_id
            }
        }

        print model
        return jsonify(model), 201

api.add_resource(Units, '/api/units')