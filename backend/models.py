from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()
class Users(db.Model):
    __table_name__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String(255), default='USR', nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    userName = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Accounts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String(255), default='ACC', nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    account_type = db.Column(db.String(50), nullable=False)
    
    user = relationship('Users', backref='accounts', lazy=True)

class Farms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String(255), default='FRM', nullable=False)
    account_id = db.Column(db.Integer, ForeignKey('accounts.id'), nullable=False)
    farm_name = db.Column(db.String(255), nullable=False)
    farm_location = db.Column(db.String(255), nullable=False)

    account = relationship('Accounts', backref='farms', lazy=True)