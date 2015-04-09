from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Asset as AssetModel
from flask_jwt import jwt_required, current_user
from app import jwt, api, db
from flask_restful import Resource

asset_blueprint = Blueprint('asset_blueprint', __name__)
api.init_app(asset_blueprint)


class Asset(Resource):
    method_decorators = [jwt_required()]

    def get(self, id):
        asset = AssetModel.find(id=id)

        model = {
            'asset': {
                'id': asset.id,
                'description': asset.description,
                'title': asset.title,
                'serial': asset.serial,
                'model': asset.model,
                'status': asset.status,
                'quantity_on_hand': asset.quantity_on_hand,
                'max_quantity': asset.max_quantity,
                'min_quantity': asset.min_quantity,
                'tag': asset.tag,
                'image': asset.image,
                'note': asset.note,
                'purchase_cost': asset.purchase_cost,
                'warranty_expiration': asset.warranty_expiration,
                'end_of_life': asset.end_of_life,
                'requestable': asset.requestable
            }
        }
        return jsonify(model)

    def post(data):
        # TODO Add protection against insufficient permissions
        if AssetModel.find(email=data['email']) is None:
            asset = AssetModel(
                email=data['email'],
                password=data['password'],
                first_name=data['first-name'],
                last_name=data['last-name'],
                status=data['status']
            )

            asset.add_role('asset')
            asset.save()

api.add_resource(Asset, '/assets/<int:id>')