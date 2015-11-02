from flask import Blueprint, jsonify
from model import Unit as UnitModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

unit_blueprint = Blueprint('unit_blueprint', __name__)
api.init_app(unit_blueprint)


class Unit(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):
        unit = UnitModel.find(id=id)

        model = {
            'unit': {
                'id': unit.id,
                'status': unit.status,
                'tag': unit.tag,
                'note': unit.note,
                'image': unit.image,
                'asset': unit.asset_id,
                'purhase_cost': unit.purchase_cost,
                'warranty_expiration': unit.warranty_expiration,
                'end_of_life': unit.end_of_life,
            }
        }
        return jsonify(model)

api.add_resource(Unit, '/api/units/<int:id>')