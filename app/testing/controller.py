from flask import Blueprint, redirect, abort
from app.users.model import User
from app.roles import Role
from app.departments.model import Department
import csv, os
testing = Blueprint('testing', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

def insert_roles():

    reader = csv.reader(open(os.path.join(__location__, 'roles.csv')), delimiter=',', quotechar='"')

    for row in reader:
        if Role.find(name=row[1]) is None:
            Role(
                name=row[1]
            ).save()
    print 'inserted roles.'


def insert_users():
    reader = csv.reader(open(os.path.join(__location__, 'users.csv')), delimiter=',', quotechar='"')
    for row in reader:
        username = (row[0] + '.' + row[1]).lower()

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
    print 'inserted users.'

def insert_user_roles():
    users = User.list()
    roles = Role.list()

    for user in users:
        for role in roles:
            user.roles.append(role)

    print 'associated users with roles'

def insert_departments():
    reader = csv.reader(open(os.path.join(__location__, 'departments.csv')), delimiter=',', quotechar='"')
    for row in reader:
        if Department.find(name=row[0]) is None:
            department = Department(
                name=row[0],
                id=row[1]
            )

            department.save()

            parent = Department.find(id=row[2])

            if parent is not None:
                parent.children.append(department)

    print 'inserted departments.'

def insert_user_departments():
    users = User.list()
    department_A = Department.find(id=60430)
    department_B = Department.find(id=60350)
    for user in users:
        user.departments.append(department_A)
        user.departments.append(department_B)

    print 'associated users with departments'

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
    insert_departments()
    insert_user_departments()
    return 'ok', 200