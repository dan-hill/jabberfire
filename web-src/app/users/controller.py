from flask import Blueprint, request, redirect
from flask_security import login_user
from app.users import User
from app.departments.model import Department
from app import user_datastore
from flask_security.utils import encrypt_password
users = Blueprint('users', __name__)


@users.route('/testuser')
def create_test_user():


    user_datastore.create_user(
        email='dan@danhill.us',
        password=encrypt_password('123123123'),
        active=1,
    )

    user_datastore.add_role_to_user('dan@danhill.us', 'admin')

    user_datastore.create_user(email='thirtyseventhirty@gmail.com', password=encrypt_password('123123123'), active=1)
    user_datastore.add_role_to_user('thirtyseventhirty@gmail.com', 'user')

    user_datastore.create_user(
        email='ralphie@boogers.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Ralphie',
        last_name='Wiggim'
    )

    user_datastore.add_role_to_user('ralphie@boogers.com', 'user')

    user_datastore.create_user(
        email='jeff@jeffrules.org',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Jeff',
        last_name='Jambrox'
    )

    user_datastore.add_role_to_user('jeff@jeffrules.org', 'admin')

    user_datastore.create_user(
        email='finn@adventuremaster.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Finn',
        last_name='The Human'
    )

    user_datastore.add_role_to_user('finn@adventuremaster.com', 'admin')

    user_datastore.create_user(
        email='jakethedog@adventuremaster.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Jake',
        last_name='The Dog'
    )

    user_datastore.add_role_to_user('jakethedog@adventuremaster.com', 'admin')

    user_datastore.create_user(
        email='bender@ilovebender.com',
        password=encrypt_password('123123123'),
        active=1,
        first_name='Bender',
        last_name='Rodriguez'
    )

    user_datastore.add_role_to_user('bender@ilovebender.com', 'admin')

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
