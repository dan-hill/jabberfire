from app import db

class Setting(db.Model):

    def __init__(self, **kwargs):
        self.description = kwargs.get('description')
        self.title = kwargs.get('title')
        self.value = kwargs.get('value')


    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    title = db.Column(db.String(255))

    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(Setting).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Setting).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()
