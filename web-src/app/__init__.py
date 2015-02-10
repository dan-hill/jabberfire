# setup the app object
from flask import Flask
from dashboard.dashboard import dashboard
from auth.auth import auth

# App initialization
app = Flask(__name__)

# Blueprint registrations
app.register_blueprint(dashboard)
app.register_blueprint(auth)

# Global configurations
app.config['ORGANIZATION_SHORT_NAME'] = 'CCMH'
app.config['ORGANIZATION_LONG_NAME'] = "Comanche County Memorial Hospital"