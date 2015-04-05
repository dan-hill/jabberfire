from flask_security import current_user


def get_tree(base_department, tree_dict):

    # TODO Protect this function from accidental infinite recurrsion.

    tree_dict = {}

    tree_dict['id'] = base_department.id
    tree_dict['text'] = base_department.name
    tree_dict['icon state'] = {'opened': False, 'disabled': False, 'selected': False}
    tree_dict['children'] = []
    tree_dict['li_attr'] = {}
    tree_dict['a_attr'] = {}

    children = base_department.sub_departments

    if len(children) > 0:
        for child in children:
            tree_dict['children'].append(get_tree(child, tree_dict))

    return tree_dict

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



