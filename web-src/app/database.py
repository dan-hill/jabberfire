from flask_sqlalchemy import SQLAlchemy
import os
from . import app
with app.app_context():
    # set the database related variables in global app config
    app.config['SECRET_KEY'] = 'gc3*z5t+6gz!&u2l5kz@p5i#dhf-cmhez4x2ab1#=f+nb^+(z1'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

db = SQLAlchemy()


def init_db():
    db.init_app(app)

    if not os.path.exists('db.sqlite'):
        with app.app_context():
            db.create_all()