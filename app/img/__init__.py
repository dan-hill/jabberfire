from flask import Blueprint, redirect, abort, jsonify, make_response, request, url_for
import csv, os
import io
from werkzeug.utils import secure_filename
import uuid
img = Blueprint('img', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in set(['jpg', 'png'])

@img.route('/api/img', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        print request.files['0'].filename
        file = request.files['0']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            extention = filename.split('.')[-1]
            print extention
            filename = uuid.uuid4().urn[9:] + '.' + extention
            file.save(os.path.join(os.path.realpath('.') + '/app/img/images', filename))
            response = {'filename': filename}
            return jsonify(response)

@img.route("/api/img/<filename>", methods=['GET', 'POST'])
def index(filename):
    if request.method == 'GET':
        print filename
        with open(os.path.join(__location__, filename), 'r+') as f:
            imgdata = f.read()
        response = make_response(imgdata)
        response.headers['Content-Type'] = 'image/jpeg'
        response.headers['Content-Disposition'] = 'attachment; filename='+filename
        return response
