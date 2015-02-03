# setup the app object
from flask import Flask
from dashboard.hello_world import hello_world
from auth.auth import auth

app = Flask(__name__)
app.register_blueprint(hello_world)
app.register_blueprint(auth)
