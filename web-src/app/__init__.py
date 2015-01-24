# setup the app object
from flask import Flask
from app.dashboard.hello_world import hello_world

app = Flask(__name__)
app.register_blueprint(hello_world)
