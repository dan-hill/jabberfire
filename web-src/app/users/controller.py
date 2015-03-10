from flask import Blueprint, request, redirect
from flask_security import login_user
from app.users import User
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password
users = Blueprint('users', __name__)


@users.route('/testuser')
def create_test_user():
    dept_ccmh_main = Department()
    dept_ccmh_main.title = 'CCMH Main'
    dept_ccmh_main.parent_id = 0
    dept_ccmh_main.save()

    dept_emergency_room = Department()
    dept_emergency_room.name = 'Emergency Room'
    dept_emergency_room.parent_id = dept_ccmh_main.id
    dept_emergency_room.save()


    user_datastore.create_user(
        email='dan@danhill.us',
        password=encrypt_password('123123123'),
        active=1,
    )

    user_datastore.add_role_to_user('dan@danhill.us', 'admin')

    user_datastore.create_user(email='thirtyseventhirty@gmail.com', password=encrypt_password('123123123'), active=1)
    user_datastore.add_role_to_user('thirtyseventhirty@gmail.com', 'user')

    return 'ok'


@users.route('/login', methods=['POST'])
def login():
    user = user_datastore.get_user(request.form['username'])
    if user is None:
        print 'User did not exist'
        return redirect(request.args['next'])

    if user.verify_password(request.form['password']):
        login_user(user)

    return redirect(request.args['next'])
