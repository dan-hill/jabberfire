from flask_jwt import current_user
from flask import abort
def roles_required(roles):
    for role in roles:
        role = role.lower()

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
                abort(403)

        return wrapper

    return decorator