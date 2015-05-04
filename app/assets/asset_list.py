from flask import Blueprint, jsonify
from model import Asset as AssetModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

asset_list_blueprint = Blueprint('asset_list_blueprint', __name__)
api.init_app(asset_list_blueprint)


class AssetList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        assetlist = []
        for asset in AssetModel.list():

            model = {
                'id': asset.id,
                'description': asset.description,
                'name': asset.name,
                'max_quantity': asset.max_quantity,
                'min_quantity': asset.min_quantity,
                'image': asset.image
            }

            assetlist.append(model)

        return jsonify({'assets': assetlist})



api.add_resource(AssetList, '/api/assets')
