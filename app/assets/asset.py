from flask import Blueprint, jsonify
from model import Asset as AssetModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

asset_blueprint = Blueprint('asset_blueprint', __name__)
api.init_app(asset_blueprint)


class Asset(Resource):

    method_decorators = [jwt_required()]

    def get(self, id):
        asset = AssetModel.find(id=id)

        units = []
        for unit in asset.units:
            units.append({
            'id': unit.id,
            'status': unit.status,
            'tag': unit.tag,
            'purchase_cost': unit.purchase_cost,
            'warranty_expiration': unit.warranty_expiration,
            'end_of_life': unit.end_of_life,
            'asset': unit.asset_id,
            })

        model = {
            'asset': {
                'id': asset.id,
                'description': asset.description,
                'name': asset.name,
                'max_quantity': asset.max_quantity,
                'min_quantity': asset.min_quantity,
                'image': asset.image,
                'manufacturer': asset.manufacturer_id,
                'units': units,
                'requires_approval': 1 if asset.requires_approval else 0
            }
        }
        return jsonify(model)

api.add_resource(Asset, '/api/assets/<int:id>')