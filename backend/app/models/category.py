from app.extensions import db
from sqlalchemy.orm import backref
from datetime import datetime

from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description  = db.Column(db.String(200))
    cat_img = db.Column(db.String(), nullable=True)
    slug = db.Column(db.String(), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    
    parent_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    
    children = db.relationship('Category', backref=backref('parent', remote_side=[id]), lazy=True)

        
    def __repr__(self):
        return f'<Cat ID: {self.id}, name: {self.name}, parent: {self.parent_id}>'
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'cat_img': self.cat_img,
            'slug': self.slug,
        }
