from app import db
from app.manufacturers import Manufacturer
class Asset(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.name = kwargs.get('name')
        self.max_quantity = kwargs.get('max_quantity')
        self.min_quantity = kwargs.get('min_quantity')
        self.image = kwargs.get('image')
        self.manufacturer_id = kwargs.get('manufacturer')
        self.requires_approval = kwargs.get('requires_approval')


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    name = db.Column(db.String(255))
    max_quantity = db.Column(db.Integer)
    min_quantity = db.Column(db.Integer)
    image = db.Column(db.String(255))
    requires_approval = db.Column(db.Boolean)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('manufacturer.id'))
    units = db.relationship('Unit', backref='asset')


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
