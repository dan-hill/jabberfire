from app import db


class Manufacturer(db.Model):

    def __init__(self, **kwargs):
        # self.id = kwargs.get('id')
        self.description = kwargs.get('description')
        self.title = kwargs.get('title')
        self.note = kwargs.get('note')

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    title = db.Column(db.String(255))
    note = db.Column(db.String(1000))

    supplier = None

    assets = db.relationship('Asset')

    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(Manufacturer).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Manufacturer).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()
