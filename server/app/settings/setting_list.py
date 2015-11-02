from flask import Blueprint, jsonify
from model import Setting as SettingModel
from flask_jwt import jwt_required
from app import api
from flask_restful import Resource

setting_list_blueprint = Blueprint('setting_list_blueprint', __name__)
api.init_app(setting_list_blueprint)


class SettingList(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        settinglist = []

        for setting in SettingModel.list():

            model = {
                'id': setting.id,
                'title': setting.title,
                'value': setting.value

            }

            settinglist.append(model)

        return jsonify({'settings': settinglist})



api.add_resource(SettingList, '/api/settings')
