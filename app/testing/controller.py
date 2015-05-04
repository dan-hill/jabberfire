from flask import Blueprint, redirect, abort, jsonify, make_response
from app.users.model import User
from app.departments.model import Department
import csv, os
import io


testing = Blueprint('testing', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


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
                employee_id=row[4],
                role='administrator'
            ).save()
    print 'inserted users.'


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
    insert_users()
    insert_departments()
    insert_user_departments()
    return 'ok', 200

@testing.route('/api/img/<filename>', methods=['GET'])
def get_image(filename):
    print filename
    with open(os.path.join(__location__, filename), 'r+') as f:
        imgdata = f.read()
    response = make_response(imgdata)
    response.headers['Content-Type'] = 'image/jpeg'
    response.headers['Content-Disposition'] = 'attachment; filename='+filename
    return response