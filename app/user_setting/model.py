from app import db
from app.settings import Setting
class UserSetting(db.Model):
    __tablename__ = 'user_setting'

    def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id')
        self.role_id = kwargs.get('role_id')

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(1000))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    setting_id = db.Column(db.Integer(), db.ForeignKey('setting.id'))
    setting = db.relationship('Setting', backref='user_settings')

    @staticmethod
    def list():
        return db.session.query(UserSetting).all()