
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS
from flask_jwt import JWT, JWTError
from flask_restful import Api
from utility import ErrorFriendlyApi

db = SQLAlchemy()
jwt = JWT()
api = ErrorFriendlyApi()
mail = Mail()


import auth.controller

def create_app(debug=False):
    # Instantiate the application object
    app = Flask(__name__)

    CORS(app, resources='*', allow_headers='*')
    # Register the blueprints

    from app.testing.controller import testing
    app.register_blueprint(testing)

    # Role resource blueprints
    from app.roles import (
        role_blueprint,
        role_list_blueprint
    )

    app.register_blueprint(role_blueprint)
    app.register_blueprint(role_list_blueprint)

    # User resource blueprints
    from app.users import (
        user_blueprint,
        user_list_blueprint,
        current_user_blueprint
    )

    app.register_blueprint(user_blueprint)
    app.register_blueprint(user_list_blueprint)
    app.register_blueprint(current_user_blueprint)

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
        SQLALCHEMY_DATABASE_URI='mysql://root:password@localhost/ccmh',
        SQLALCHEMY_COMMIT_ON_TEARDOWN=True,

        # TEMPLATE PATHS
        CSS='/static/css/',
        PLUGIN='/static/plugin/',
        IMG='/static/img/',
        JS='/static/js/',

        # SECURITY CORE
        SECURITY_PASSWORD_HASH='sha512_crypt',
        SECURITY_PASSWORD_SALT='FLAPPYflapflapflap',
        # SECURITY TEMPLATE PATHS

        JWT_EXPIRATION_DELTA=3600
    )

    # Initiate the database object
    db.init_app(app)

    # Create the Database
    with app.app_context():
        db.create_all()

    # Initiate the Mail object
    mail.init_app(app)

    jwt.init_app(app)

    return app


