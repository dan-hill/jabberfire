from app import db



class Department(db.Model):
    """ Holder """

    __tablename__ = 'department'

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('department.id'))

    name = db.Column(db.String(255))

    sub_departments = db.relationship('Department',
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