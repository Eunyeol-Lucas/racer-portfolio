from db_connect import db
from datetime import datetime

# 사용자 정보
class User(db.Model):
    __tablename__   = 'user'
    id              = db.Column(db.Integer,  primary_key=True, nullable=False, autoincrement=True)
    username        = db.Column(db.String(32), nullable=False)
    userid          = db.Column(db.String(100), nullable=False, unique=True)
    password        = db.Column(db.String(64), nullable=False)
    profile_image   = db.Column(db.Text,nullable=False, default="./static/default.png")
    introduction    = db.Column(db.String(100), default="안녕하세요")

    def __init__(self, userid, username, password):
        self.username       = username
        self.userid         = userid
        self.password       = password

    def to_dict(self):
        return {
            'username': self.username,
            'profile_image': self.profile_image,
            'introduction': self.introduction
        }

    profiles        = db.relationship("Profile", backref="user", lazy=True)
    educations      = db.relationship("Education", backref="user", lazy=True)
    awards          = db.relationship("Award", backref="user", lazy=True)
    projects        = db.relationship("Project", backref="user", lazy=True)
    certificates    = db.relationship("Certification", backref="user", lazy=True)


# 사용자 프로필
class Profile(db.Model):
    __tablename__   = "profiles"
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    profile_image   = db.Column(db.Text,nullable=False)
    introduction    = db.Column(db.String(100))

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'profile_image': self.profile_image,
            'introduction': self.introduction
        }

# 사용자 학력 사항
class Education(db.Model):
    __tablename__   = "educations"
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    school          = db.Column(db.String(100), nullable=False)
    major           = db.Column(db.String(100), nullable=False)
    status          = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'school': self.school,
            'major': self.major,
            'status': self.status
        }

# 사용자 수상 내역
class Award(db.Model):
    __tablename__   = "awards"
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name          = db.Column(db.String(255))
    description     = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }    

# 사용자 프로젝트 내역
class Project(db.Model):
    __tablename__   = "projects"
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title           = db.Column(db.String(255), nullable=False) 
    content         = db.Column(db.String(255), nullable=False) 
    start_date      = db.Column(db.Date, nullable=False)
    end_date        = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'start_date': self.start_date,
            'end-_data': self.end_date
        }

# 사용자 자격 정보
class Certification(db.Model):
    __tablename__   = "certificates"
    id              = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name            = db.Column(db.String(100), nullable=False)
    certified_by    = db.Column(db.String(100), nullable=False)
    certified_date  = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'certified_by': self.certified_by,
            'certified_date': self.certified_date
        }
