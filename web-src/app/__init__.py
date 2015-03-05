# setup the app object
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_mail import Mail

import os

socketio = SocketIO()
db = SQLAlchemy()
mail = Mail()


def create_app(debug=False):
    app = Flask(__name__)

    app.debug = debug

    from dashboard.dashboard import dashboard

    app.register_blueprint(dashboard)

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

    db.init_app(app)

    # Make sure the database exists.
    if not os.path.exists('db.sqlite'):
        with app.app_context():
            db.create_all()

    app.config.update(
        DEBUG=True,
        # EMAIL SETTINGS
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME='the.auto.server@gmail.com',
        MAIL_PASSWORD='autopass'
    )

    app.config['SITE_URL'] = 'http://127.0.0.1/'

    mail.init_app(app)

    # wrap the app in socketio
    socketio.init_app(app)

    return app
