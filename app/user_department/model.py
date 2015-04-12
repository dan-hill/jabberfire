from app import db
from app.departments import Department


class UserDepartment(db.Model):
    __tablename__ = 'user_department'

    def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id')
        self.department_id = kwargs.get('role_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    department_id = db.Column(db.Integer(), db.ForeignKey('department.id'))
    department = db.relationship('Department', backref='user_departments')

    @staticmethod
    def list():
        return db.session.query(UserDepartment).all()

