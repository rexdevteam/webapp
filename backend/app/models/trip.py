from os import name
from sqlalchemy import inspect, or_

from app.extensions import db
from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    start_date = db.Column(db.DateTime(timezone=True), nullable=False)
    end_date = db.Column(db.DateTime(timezone=True), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    
    app_user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'), nullable=False)
    app_user = db.relationship('AppUser', backref=db.backref('trips', lazy='dynamic'))
    
    def __repr__(self) -> str:
        return f"<Trip {self.id}, destination: {self.destination}>"
    
    @staticmethod
    def add_search_filters(query, search_term):
        """
        Adds search filters to a SQLAlchemy query.
        """
        if search_term:
            search_term = f"%{search_term}%"
            query = query.filter(
                    or_(
                        Trip.destination.ilike(search_term),
                        Trip.amount.ilike(search_term)
                    )
                )
        return query
    
    @classmethod
    def add_trip(cls, destination, amount, app_user_id, **kwargs):
        
        trip = cls(destination=destination, amount=amount, app_user_id=app_user_id)
        
        # Set additional attributes from kwargs
        if kwargs.items():
            for key, value in kwargs.items():
                setattr(trip, key, value)
        
        db.session.add(trip)
        db.session.commit()
        
        return trip
    
    def update(self, commit: bool = True, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        
        if commit:
            db.session.commit()

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'destination': self.destination,
            'amount': self.amount,
            'start_date': to_gmt1_or_none(self.start_date),
            'end_date': to_gmt1_or_none(self.end_date),
            'created_at': to_gmt1_or_none(self.created_at),
        }
    
    def to_excel_data(self) -> dict:
        return {
            "Destination": self.destination,
            "Amount": self.amount,
            'Start date': to_gmt1_or_none(self.start_date),
            'End date': to_gmt1_or_none(self.end_date),
            'Date Created': to_gmt1_or_none(self.created_at),
        }


class Itinerary(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=False)
    trip = db.relationship('Trip', backref=db.backref('itineraries', lazy='dynamic'))
    
    category_id = db.Column(db.Integer, db.ForeignKey('itinerary_category.id'), nullable=False)
    itinerary_category = db.relationship('ItineraryCategory', backref=db.backref('itineraries', lazy='dynamic'))
    
    def update(self, commit: bool = True, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        
        if commit:
            db.session.commit()
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount
        }


class ItineraryCategory(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description  = db.Column(db.String(200))
    cat_img = db.Column(db.String(), nullable=True)
    slug = db.Column(db.String(), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)

    
    def __repr__(self):
        return f'<Cat ID: {self.id}, name: {self.name}>'
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self, commit: bool = True, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        
        if commit:
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