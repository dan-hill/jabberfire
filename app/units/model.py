from app import db
from app.suppliers import Supplier
class Unit(db.Model):

    def __init__(self, **kwargs):
        self.status = kwargs.get('status')
        self.tag = kwargs.get('tag')
        self.image = kwargs.get('image')
        self.note = kwargs.get('note')
        self.purchase_cost = kwargs.get('purchase_cost')
        self._warranty_expiration = kwargs.get('warranty_expiration')
        self._end_of_life = kwargs.get('end_of_life')
        self.requestable = kwargs.get('requestable')

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(255))
    tag = db.Column(db.Integer)
    image = db.Column(db.String(255))
    note = db.Column(db.String(1000))
    purchase_cost = db.Column(db.Float)
    _warranty_expiration = db.Column(db.Date)
    _end_of_life = db.Column(db.Date)
    requestable = db.Column(db.Boolean)
    parent_id = db.Column(db.Integer, db.ForeignKey('unit.id'))
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))

    activities = None

    components = db.relationship(
        'Unit',
        cascade='all',
        backref=db.backref(
            'parent',
            remote_side='unit.id'))

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
        return db.session.query(Unit).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Unit).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()