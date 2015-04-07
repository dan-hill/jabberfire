from flask import Blueprint, redirect
from app.users.model import User
from app.departments.model import Department
import csv, os

testing = Blueprint('testing', __name__)

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))



def increment_user(username):
    n = 1
    while User.find(username=username + '.' + str(n)) is not None:
        n += 1
    return username + '.' + str(n)

def insert_users():
    reader = csv.reader(open(os.path.join(__location__, 'users.csv')), delimiter=',', quotechar='"')
    for row in reader:
        print row
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



    # Insert the users




@testing.route('/insert-test-data')
def create_test_user():
    """
    Populates the database with test user data.

    Returns:
        (string) OK
    """

    insert_users()
    return redirect('/')