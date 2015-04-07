from app.users import User as UserModel

from flask_jwt import current_user
from app import jwt


@jwt.authentication_handler
def authenticate(username, password):
    user = UserModel.find(username=username)
    if user is not None:
        if user.verify_password(password):
            return user


@jwt.user_handler
def load_user(payload):
    user = UserModel.find(id=payload['user_id'])
    return user

@jwt.error_handler
def error_handler(e):
    return "Unauthorized", 401

def roles_required(roles):
    def decorator(function):
        def wrapper(*args, **kwargs):
            user_roles = []
            for role in current_user.roles:
                user_roles.append(role.name)

            user_role_set = set(user_roles)
            required_roles_set = set(roles)
            print user_role_set
            print required_roles_set
            if required_roles_set.issubset(user_role_set):
                function(*args, **kwargs)

            else:
                print 'something something'

        return wrapper

    return decorator
