from app import db

class Role(db.Model):
    """The user role data model.

        User roles are defined when the application is initialized. To add
        additional roles, insert them into the database from the
        ``app.create_app()`` function using the ``user_datastore.create_role()``
        function.

    """
    __tablename__ = 'role'

    def __init__(self, **kwargs):
        self.name = kwargs.get('name')

    #: Generated id for the role.
    id = db.Column(db.Integer(), primary_key=True)

    #: The name of the role.
    #: This attribute is used when checking for user roles using the
    #: ``@role_required`` decorator.
    name = db.Column(db.String(80), unique=True)

    #: Short description of the role.
    description = db.Column(db.String(255))

    @staticmethod
    def find(**kwargs):
        return db.session.query(Role).filter_by(**kwargs).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def list():
        return db.session.query(Role).all()