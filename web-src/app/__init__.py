
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_mail import Mail
from flask_security import Security, SQLAlchemyUserDatastore

import os

socket = SocketIO()
db = SQLAlchemy()
mail = Mail()
security = Security()

from app.users.user import user_datastore, User

def create_app(debug=False):
    # Instantiate the application object
    app = Flask(__name__)

    # Register the blueprints

    from dashboard.dashboard import dashboard
    app.register_blueprint(dashboard)

    from app.users.controller import users

    app.register_blueprint(users)

    # Set configurations
    app.config.update(
        DEBUG=debug,

        # EMAIL SETTINGS
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME='the.auto.server@gmail.com',
        MAIL_PASSWORD='autopass',

        # DATABASE SETTINGS
        SECRET_KEY=':r7^97B)qA8{>|{8TXDz"4]1bt>O%s',
        SQLALCHEMY_DATABASE_URI='sqlite:///db.sqlite',
        SQLALCHEMY_COMMIT_ON_TEARDOWN=True,

        # TEMPLATE PATHS
        CSS='static/css/',
        PLUGIN='static/plugin/',
        IMG='static/img/',
        JS='static/js/',

        # SECURITY CORE
        SECURITY_PASSWORD_HASH='sha512_crypt',
        # SECURITY TEMPLATE PATHS
        SECURITY_LOGIN_USER_TEMPLATE='security/login.html'
    )



    # Initiate the database object
    db.init_app(app)

    # Create the Database
    if not os.path.exists('db.sqlite'):
        with app.app_context():
            db.create_all()

    # Initiate the security object
    security.init_app(app, user_datastore)

    # Initiate the Mail object
    mail.init_app(app)


    # Initiate the socketio object
    socket.init_app(app)

    return app


