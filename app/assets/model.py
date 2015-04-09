from app import db
from app.manufacturers import Manufacturer

class Asset(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.title = kwargs.get('title')
        self.serial = kwargs.get('serial')
        self.model = kwargs.get('model')
        self.status = kwargs.get('status')
        self.quantity_on_hand = kwargs.get('quantity_on_hand')
        self.max_quantity = kwargs.get('max_quantity')
        self.min_quantity = kwargs.get('min_quantity')
        self.tag = kwargs.get('tag')
        self.image = kwargs.get('image')
        self.note = kwargs.get('note')
        self.purchase_cost = kwargs.get('purchase_cost')
        self.warranty_expiration = kwargs.get('warranty_expiration')
        self.end_of_life = kwargs.get('end_of_life')
        self.requestable = kwargs.get('requestable')

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    title = db.Column(db.String(255))
    serial = db.Column(db.String(255))
    model = db.Column(db.String(255))
    status = db.Column(db.String(255))
    quantity_on_hand = db.Column(db.Integer)
    max_quantity = db.Column(db.Integer)
    min_quantity = db.Column(db.Integer)
    tag = db.Column(db.Integer)
    image = db.Column(db.String(255))
    note = db.Column(db.String(1000))
    purchase_cost = db.Column(db.Float)
    warranty_expiration = db.Column(db.Date)
    end_of_life = db.Column(db.Date)
    requestable = db.Column(db.Boolean)
    parent_id = db.Column(db.Integer, db.ForeignKey('asset.id'))

    manufacturer = db.Column(db.Integer, db.ForeignKey('manufacturer.id'))

    supplier = None

    components = db.relationship(
        'Asset',
        cascade='all',
        backref=db.backref(
            'parent',
            remote_side='Asset.id'))

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
