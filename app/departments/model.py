
from app import db


class Department(db.Model):
    """ Department data model.

    Attributes:
    id (int):
      Unique identifier for the department. This number is used internally int eh database.
    parent_id (int):
      The id of the department that the department belongs under. If the department is at the
      top of the tree structure, this should be None.
    name (string):
      The name of the department. Should not have the name of the parent department prefixed to it.
    sub_departments (list of departments):
      A list of department objects that are directly under this department in the organizational tree
      structure.
    """

    # TODO change sub_departments to children to more concretely describe the tree nature of the relationship.

    __tablename__ = 'department'

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.name = kwargs.get('name')
        self.description = kwargs.get('description')
        self.parent_id = kwargs.get('parent_id')


    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))

    children = db.relationship(
        'Department',
        cascade='all',
        backref=db.backref('parent', remote_side='Department.id'))

    def exists(self):

        if Department.query.filter_by(id=self.id).first():
            return True
        return False

    def save(self):
        db.session.add(self)
        db.session.commit()

        if not self.exists():
            return False
        return True

    def delete(self):
        db.session.delete(self)
        db.session.commit()

        if self.exists():
            return False

        return True

    @staticmethod
    def list():
        return db.session.query(Department).all()

    @staticmethod
    def find(**kwargs):
        return db.session.query(Department).filter_by(**kwargs).first()