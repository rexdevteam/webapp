'''
This module defines the User model for the database.

It includes fields for the user's email, password, and other necessary information,
as well as methods for password hashing and verification.

@author Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''

from flask import current_app
from slugify import slugify
from sqlalchemy import inspect, or_
from sqlalchemy.orm import backref
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from ..extensions import db
from .role import Role, RoleNames
from .media import Media
from ..utils.date_time import DateTimeUtils, to_gmt1_or_none
from ..utils.helpers.loggers import console_log
from config import Config


class AppUser(db.Model, UserMixin):
    
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), nullable=True, unique=True)
    name = db.Column(db.String(50), nullable=True)
    phone = db.Column(db.String(120), nullable=True)
    password_hash = db.Column(db.String(255), nullable=True)
    signed_in = db.Column(db.Boolean, default=False)
    password_change_required = db.Column(db.Boolean, default=True)
    date_joined = db.Column(db.DateTime(timezone=True), default=DateTimeUtils.aware_utcnow)
    two_fa_secret = db.Column(db.String(255), nullable=True)
    
    # Relationships
    roles = db.relationship('Role', secondary='user_roles', backref=db.backref('app_users', lazy='dynamic'), cascade="save-update, merge", single_parent=True)
    
    def __str__(self) -> str:
        return self.name.capitalize()
    
    @property
    def password(self) -> AttributeError:
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''
        #This returns True if the password is same as hashed password in the database.
        '''
        return check_password_hash(self.password_hash, password)
    
    @property
    def role_names(self) -> list[str]:
        """Returns a list of role names for the user."""
        if not db.inspect(self).persistent:
            # Reattach to session if necessary
            self = db.session.merge(self)
        return [str(role.name.value) for role in self.roles]
    
    @staticmethod
    def add_search_filters(query, search_term):
        """
        Adds search filters to a SQLAlchemy query.
        """
        if search_term:
            search_term = f"%{search_term}%"
            query = query.filter(
                    or_(
                        AppUser.name.ilike(search_term),
                        AppUser.phone.ilike(search_term),
                        AppUser.email.ilike(search_term)
                    )
                )
        return query
    
    def __repr__(self) -> str:
        return f"<ID: {self.id}, email: {self.email}>"
    
    def insert(self) -> None:
        db.session.add(self)
        db.session.commit()

    def update(self, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self, include_venue=True, resident_venue_info=False) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "password_change_required": self.password_change_required,
            "date_joined": to_gmt1_or_none(self.date_joined),
            "roles": self.role_names,
        }
    


def create_default_super_admin(clear: bool = False) -> None:
    admin_role = Role.query.filter_by(name=RoleNames.ADMIN).first()
    super_admin_role = Role.query.filter_by(name=RoleNames.SUPER_ADMIN).first()
    
    if not admin_role:
        admin_role = Role(
            name=RoleNames.ADMIN,
            slug=slugify(RoleNames.ADMIN.value)
        )
        db.session.add(admin_role)
        db.session.commit()
    
    if not super_admin_role:
        super_admin_role = Role(
            name=RoleNames.SUPER_ADMIN,
            slug=slugify(RoleNames.SUPER_ADMIN.value)
        )
        db.session.add(super_admin_role)
        db.session.commit()
    
    if inspect(db.engine).has_table('app_user'):
        admin = AppUser.query.join(AppUser.roles).filter(Role.name == RoleNames.ADMIN).first()
        if clear and admin:
            # Clear existing roles before creating new ones
            admin.delete()
            db.session.close()
            console_log(data="Admin deleted successfully")
            return
        
        if not admin:
            admin_user = AppUser(
                name=current_app.config['DEFAULT_SUPER_ADMIN_USERNAME'],
                email='admin@mail.com',
                password_change_required=True
            )
            admin_user.set_password(current_app.config['DEFAULT_SUPER_ADMIN_PASSWORD'])
            admin_user.roles.append(admin_role)
            admin_user.roles.append(super_admin_role)
            
            db.session.add(admin_user)
            db.session.commit()
            console_log(data="Admin user created with default credentials")
        else:
            console_log(data="Admin user already exists")

