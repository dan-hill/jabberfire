from flask import Blueprint, jsonify, request
from model import Asset as AssetModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

asset_list_blueprint = Blueprint('asset_list_blueprint', __name__)
api.init_app(asset_list_blueprint)
from app.auth import roles_required

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

    @roles_required(['administrator'])
    def post(self):
        json = request.json['asset']

        asset = AssetModel(
            name=json['name'],
            description=json['description'],
            manufacturer=json['manufacturer'],
            min=json['min'],
            image=json['image'],
            max=json['max']
        )

        asset.save()

        model = {
            'department': {
                'id': asset.id,
                'name': asset.name,
                'description': asset.description,
                'parent_id': asset.parent_id
            }
        }

        print model
        return jsonify(model), 201

api.add_resource(AssetList, '/api/assets')
