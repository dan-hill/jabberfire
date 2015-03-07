from app import db
from app.roles import Role
from flask_security import SQLAlchemyUserDatastore, UserMixin
from flask_security.utils import verify_password


roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    """Docstring for class Foo."""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())

    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))

    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def verify_password(self, password):
        return verify_password(password, self.password)

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

user_datastore = SQLAlchemyUserDatastore(db, User, Role)