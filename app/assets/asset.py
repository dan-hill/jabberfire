from flask import Blueprint, jsonify, request
from model import Asset as AssetModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource
from app.auth import roles_required
from app.manufacturers import Manufacturer
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

    @roles_required(['administrator', 'technician'])
    def put(self):
        json = request.json['asset']

        asset = AssetModel(
            name=json['name'],
            description=json['description'],
            manufacturer_id=json['manufacturer'],
            min_quantity=json['min_quantity'],
            image=json['image'],
            max_quantity=json['max_quantity']
        )

        asset.manufacturer = Manufacturer().find(id=json['manufacturer'])
        asset.save()

        model = {
            'department': {
                'id': asset.id,
                'name': asset.name,
                'description': asset.description,
                'manufacturer': asset.manufacturer_id,
                'min_quantity': asset.min_quantity,
                'max_quantity': asset.max_quantity,
                'image': asset.image,
                'requires_approval': 'true' if asset.requires_approval else 'false'
            }
        }


        print model
        return jsonify(model), 201

api.add_resource(Asset, '/api/assets/<int:id>')