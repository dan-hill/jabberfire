from flask import Blueprint, request, redirect, abort, make_response, jsonify, render_template,g
from model import Manufacturer as ManufacturerModel
from flask_jwt import jwt_required, current_user
from app import jwt, api
from flask_restful import Resource

manufacturer_list_blueprint = Blueprint('manufacturer_list_blueprint', __name__)
api.init_app(manufacturer_list_blueprint)


class ManufacturerList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        manufacturerlist = []

        for manufacturer in ManufacturerModel.list():

            assets = []


            for asset in manufacturer.assets:
                assets.append(asset.id)

            model = {
                'id': manufacturer.id,
                'description': manufacturer.description,
                'title': manufacturer.title,
                'note': manufacturer.note,
                'assets': assets,
                'image': manufacturer.image

            }

            manufacturerlist.append(model)

        return jsonify({'manufacturers': manufacturerlist})

    def post(self):
        json = request.json['manufacturer']
        manufacturer = ManufacturerModel(
            title=json['title'],
            description=json['description'],
            note=json['note'],
            image=json['image']
        )
        manufacturer.save()

        model = {
            'manufacturer': {
                'id': manufacturer.id,
                'title': manufacturer.title,
                'description': manufacturer.description,
                'note': manufacturer.note,
                'image': manufacturer.image
            }
        }

        print model

        return jsonify(model)

api.add_resource(ManufacturerList, '/api/manufacturers')
