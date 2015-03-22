""" User data model.

This module contains functions, variables, and classes related to user data persistance and
relationships.

Attributes:
    departments_users (Table): Stores the relationship between users and departments.
    roles_users (Table): Stores the relationship between users and roles.
    user_datastore (SQLAlchemyUserDatastore): The user datastore object. This object is used to access
      convenience functions related to querying user data.
"""

from app import db
from app.roles import Role
from flask_security import SQLAlchemyUserDatastore, UserMixin
from flask_security.utils import verify_password

departments_users = db.Table(
    'departments_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('department_id', db.Integer(), db.ForeignKey('department.id')))

roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    """ User data database model.

    The user model provides data about users and their roles in the application.

    Attributes:
      id (int):
        Unique identifier for the user that is used internally.
      email (string):
        The user's email address.
      password (string):
        A salted hash of the user's password.
      active (boolean):
        The active/deactive state of a user. Deactive users can not log in,
        but thier information is not destroyed.
      confirmed_at (datetime):
        The date and time the user was created.
      first_name (string):
        The first name of the user.
      last_name (string):
        The last name of the user.
      roles (list of Role):
        A list of roles the user has assigned to them.
      departments (list of Departments):
        A list of the departments the user is assocated with.
      full_name (string):
        The user's full name in form 'First Last'.

    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime())
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    employee_id = db.Column(db.String(255))
    status = db.Column(db.String(32), default='pending')

    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    departments = db.relationship(
        'Department',
        secondary=departments_users,
        backref=db.backref('departments', lazy='dynamic'))

    # Flask security pulls active status from an active property rather than status.
    @property
    def active(self):
        print self.status
        if self.status == 'active':
            return True
        return False

    # The active setter must be present for flask security to not cause errors.
    @active.setter
    def active(self, value):
        pass

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

    def verify_password(self, password):
        """
        Args:
          password (string): The user's plaintext password.

        Returns:
          True if password is valid. False otherwise.
        """
        return verify_password(password, self.password)

    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(User).all()


user_datastore = SQLAlchemyUserDatastore(db, User, Role)