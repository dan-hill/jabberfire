from app import db
# from app.manufacturers import Manufacturer
class Activity(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.reason = kwargs.get('reason')
        self.approved = kwargs.get('approved')
        self.note = kwargs.get('note')


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    reason = db.Column(db.String(255))
    approved = db.Column(db.Boolean)
    note = db.Column(db.String(1000))


    user_department_id = db.Column(db.Integer, db.ForeignKey('user_department.id'))
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'))

    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(Activity).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Activity).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()
