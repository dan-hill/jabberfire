from app import db

from app.roles import Role
class UserRole(db.Model):
    __tablename__ = 'user_role'

    def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id')
        self.role_id = kwargs.get('role_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), primary_key=True)
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id'), primary_key=True)
    role = db.relationship('Role', backref='user_roles')

    @staticmethod
    def list():
        return db.session.query(UserRole).all()

