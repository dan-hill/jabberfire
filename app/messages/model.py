from app import db
from passlib.context import CryptContext
password_context = CryptContext(schemes=['sha256_crypt'])


class Message(db.Model):

    __tablename__ = 'message'

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.to_user = kwargs.get('to_user')
        self.from_user = kwargs.get('from_user')
        self.type = kwargs.get('type')
        self.read = kwargs.get('read')

    id = db.Column(db.Integer, primary_key=True)
    to_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    from_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    type = db.Column(db.String(255))
    read = db.Column(db.DateTime())

    @staticmethod
    def list():
        return db.session.query(Message).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Message).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()
