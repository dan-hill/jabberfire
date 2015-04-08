from flask import Blueprint, redirect
from app.users.model import User
from app.departments.model import Department
import csv, os
from app.assets import Asset
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



def insert_assets():
    reader = csv.reader(open(os.path.join(__location__, 'assets.csv')), delimiter=',', quotechar='"')
    for row in reader:
        if Asset.find(tag=row[2]) is None:
            Asset(
                description = row[0],
                serial= row[1],
                model= row[2],
                status =row[3],
                quantity_on_hand= row[4],
                max_quantity= row[5],
                min_quantity= row[6],
                tag =row[7],
                image =row[8],
                note =row[9],
                purchase_cost= row[10],
                warranty_expiration= row[11],
                end_of_life= row[12],
                requestable= bool(row[13])
            ).save()


@testing.route('/insert-test-data')
def create_test_user():
    """
    Populates the database with test user data.

    Returns:
        (string) OK
    """

    insert_users()
    insert_assets()
    return redirect('/')