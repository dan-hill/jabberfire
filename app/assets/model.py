from app import db
from app.manufacturers import Manufacturer

class Asset(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.serial = kwargs.get('serial')
        self.model = kwargs.get('model')
        self.max_quantity = kwargs.get('max_quantity')
        self.min_quantity = kwargs.get('min_quantity')
        self.image = kwargs.get('image')
        self.note = kwargs.get('note')


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    serial = db.Column(db.String(255))
    model = db.Column(db.String(255))
    max_quantity = db.Column(db.Integer)
    min_quantity = db.Column(db.Integer)
    tag = db.Column(db.Integer)
    image = db.Column(db.String(255))
    note = db.Column(db.String(1000))

    manufacturer = db.Column(db.Integer, db.ForeignKey('manufacturer.id'))

    @property
    def warranty_expiration(self):
        return self._warranty_expiration.isoformat()

    @property
    def end_of_life(self):
        return self._end_of_life.isoformat()


    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(Asset).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Asset).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()
