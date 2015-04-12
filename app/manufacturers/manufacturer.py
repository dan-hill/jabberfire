# from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
# from model import Manufacturer as ManufacturerModel
# from flask_jwt import jwt_required, current_user
# from app import jwt, api, db
# from flask_restful import Resource
#
# manufacturer_blueprint = Blueprint('manufacturer_blueprint', __name__)
# api.init_app(manufacturer_blueprint)
#
#
# class Manufacturer(Resource):
#     method_decorators = [jwt_required()]
#
#     def get(self, id):
#         manufacturer = ManufacturerModel.find(id=id)
#         assets = []
#
#
#         for asset in manufacturer.assets:
#             assets.append(asset.id)
#
#         model = {
#             'manufacturer': {
#                 'id': manufacturer.id,
#                 'description': manufacturer.description,
#                 'title': manufacturer.title,
#                 'note': manufacturer.note,
#                 'assets': assets
#             }
#         }
#         return jsonify(model)
#
#     def post(data):
#         pass
#
# api.add_resource(Manufacturer, '/api/manufacturers/<int:id>')
