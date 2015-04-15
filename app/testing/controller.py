from flask import Blueprint, redirect
from app.users.model import User
from app.roles import Role
from app.departments import Department
import csv, os
testing = Blueprint('testing', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))



def increment_user(username):
    n = 1
    while User.find(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)


def insert_roles():

    reader = csv.reader(open(os.path.join(__location__, 'roles.csv')), delimiter=',', quotechar='"')

    for row in reader:
        if Role.find(name=row[1]) is None:
            Role(
                name=row[1]
            ).save()


def insert_users():
    reader = csv.reader(open(os.path.join(__location__, 'users.csv')), delimiter=',', quotechar='"')
    for row in reader:
        username = (row[0] + '.' + row[1]).lower()

        if User.find(username=username) is not None:
            username = increment_user(username=username)

        if User.find(username=username) is None:
            User(
                email=row[2],
                password=row[3],
                status=row[6],
                firstname=row[0],
                lastname=row[1],
                username=username,
                employee_id=row[4]
            ).save()


def insert_user_roles():
    users = User.list()
    roles = Role.list()

    for user in users:
        for role in roles:
            user.roles.append(role)


def insert_departments():
    reader = csv.reader(open(os.path.join(__location__, 'departments.csv')), delimiter=',', quotechar='"')
    for row in reader:
        department = Department()

        department.name = row[0]
        department.description = [1]
        department.save()

        parent = Department.find(id=row[2])

        if parent is not None:
            parent.children.append(department)


def insert_user_departments():
    users = User.list()
    department_A = Department.find(id=2)
    department_B = Department.find(id=4)
    for user in users:
        user.departments.append(department_A)
        user.departments.append(department_B)

@testing.route('/api/insert-test-data')
def create_test_user():
    """
    Populates the database with test user data.

    Returns:
        (string) OK
    """
    insert_roles()
    insert_users()
    insert_user_roles()
    # insert_departments()
    # insert_user_departments()
    return 'ok', 200