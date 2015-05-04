from app import db

class PasswordToken(db.Model):

    __tablename__ = 'password_token'

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True)
    _token = db.Column(db.String(255), unique=True)


    @staticmethod
    def list():
        """
        Returns:
          List containing objects for all users in the database.
        """
        return db.session.query(PasswordToken).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(PasswordToken).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

        if self.id is not None:
            return True

        return False
