from app import db

class Supplier(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.name = kwargs.get('name')
        self.website = kwargs.get('website')
        self.image = kwargs.get('image')
        self.note = kwargs.get('note')

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    name = db.Column(db.String(255))
    website = db.Column(db.String(255))
    image = db.Column(db.String(255))
    note = db.Column(db.String(1000))

    units = db.relationship('Unit')

    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(Supplier).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Supplier).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()