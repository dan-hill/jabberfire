# from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
# from model import Asset as AssetModel
# from flask_jwt import jwt_required, current_user
# from app import jwt, api
# from flask_restful import Resource
#
# asset_list_blueprint = Blueprint('asset_list_blueprint', __name__)
# api.init_app(asset_list_blueprint)
#
#
# class AssetList(Resource):
#     method_decorators = [jwt_required()]
#
#     def get(self):
#         assetlist = []
#
#         for asset in AssetModel.list():
#
#             model = {
#                 'id': asset.id,
#                 'description': asset.description,
#                 'title': asset.title,
#                 'serial': asset.serial,
#                 'model': asset.model,
#                 'status': asset.status,
#                 'quantity_on_hand': asset.quantity_on_hand,
#                 'max_quantity': asset.max_quantity,
#                 'min_quantity': asset.min_quantity,
#                 'tag': asset.tag,
#                 'image': asset.image,
#                 'note': asset.note,
#                 'purchase_cost': asset.purchase_cost,
#                 'warranty_expiration': asset.warranty_expiration,
#                 'end_of_life': asset.end_of_life,
#                 'requestable': asset.requestable,
#                 'manufacturer': asset.manufacturer
#
#             }
#
#             assetlist.append(model)
#
#         return jsonify({'assets': assetlist})
#
#
#
# api.add_resource(AssetList, '/api/assets')
