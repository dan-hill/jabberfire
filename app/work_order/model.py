from app import db
from sqlalchemy import exc

class WorkOrder(db.Model):
    __tablename__ = 'work_order'

    def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id')
        self.unit_id = kwargs.get('unit_id')
        self.department_id = kwargs.get('department_id')
        self.asset_id = kwargs.get('asset_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    asset_id = db.Column(db.Integer(), db.ForeignKey('asset.id'), nullable=False)
    unit_id = db.Column(db.Integer(), db.ForeignKey('unit.id'))
    department_id = db.Column(db.Integer(), db.ForeignKey('department.id'), nullable=False)

    activities = db.relationship('Activity', backref='work_order')


    @staticmethod
    def list():
        return db.session.query(WorkOrder).all()
    @staticmethod
    def find(**kwargs):
        return db.session.query(WorkOrder).filter_by(**kwargs).first()

    def save(self):
        from sqlalchemy import exc

        try:
            db.session.add(self)
            db.session.commit()
        except exc.SQLAlchemyError:
            return False

        return True
