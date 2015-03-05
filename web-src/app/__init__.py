# setup the app object
from flask import Flask


# App initialization
app = Flask(__name__)
import database
database.init_db()

# Blueprint registrations
from dashboard.dashboard import dashboard
from auth.auth import auth

app.register_blueprint(dashboard)
app.register_blueprint(auth)

# Database configration
app.config['SECRET_KEY'] = 'temp_super_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'

# Global configurations
app.config['ORGANIZATION_SHORT_NAME'] = 'CCMH'
app.config['ORGANIZATION_LONG_NAME'] = "Comanche County Memorial Hospital"

# Security Configurations
app.config['SECURITY_LOGIN_USER_TEMPLATE'] = 'login.html'

# Paths for templates
app.config['CSS'] = 'static/css/'
app.config['PLUGIN'] = 'static/plugin/'
app.config['IMG'] = 'static/img/'
app.config['JS'] = 'static/js/'