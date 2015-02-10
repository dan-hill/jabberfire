# setup the app object
from flask import Flask
from dashboard.dashboard import dashboard
from auth.auth import auth

app = Flask(__name__)
app.register_blueprint(dashboard)
app.register_blueprint(auth)
