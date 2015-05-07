from app import db
from sqlalchemy import exc

class Activity(db.Model):
    __tablename__ = 'activity'

    def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id')
        self.work_order_id = kwargs.get('work_order')
        self.date = kwargs.get('date')
        self.type = kwargs.get('type')
        self.note = kwargs.get('note')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    work_order_id = db.Column(db.Integer(), db.ForeignKey('work_order.id'))
    date = db.Column(db.DateTime)

    # Types: open, close, claim, unlclaim, escalate
    type = db.Column(db.String(255))
    note = db.Column(db.String(1000))

    @staticmethod
    def list():
        return db.session.query(Activity).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Activity).filter_by(**kwargs).first()

    def save(self):

        try:
            db.session.add(self)
            db.session.commit()
        except exc.SQLAlchemyError:
            return False

        return True