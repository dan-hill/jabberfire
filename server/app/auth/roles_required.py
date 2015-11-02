from flask_jwt import current_user
from flask import abort
def roles_required(roles):
    for role in roles:
        role = role.lower()

    def decorator(function):
        def wrapper(*args, **kwargs):
            if current_user.role in roles:
                function(*args, **kwargs)
            else:
                abort(403)

        return wrapper

    return decorator