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

        unitlist = []
        for unit in asset.units:
            unitlist.append(unit.id)
        model = {
            'asset': {
                'id': asset.id,
                'description': asset.description,
                'name': asset.name,
                'max_quantity': asset.max_quantity,
                'min_quantity': asset.min_quantity,
                'image': asset.image,
                'manufacturer': asset.manufacturer_id,
                'units': unitlist
            }
        }
        return jsonify(model)

api.add_resource(Asset, '/api/assets/<int:id>')