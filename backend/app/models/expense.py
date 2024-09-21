from app.extensions import db
from sqlalchemy import or_

from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=False)
    trip = db.relationship('Trip', backref=db.backref('expenses', lazy='dynamic'))

    def __repr__(self) -> str:
        return f"<Expense {self.id}, name: {self.name}>"
    
    @staticmethod
    def add_search_filters(query, search_term):
        """
        Adds search filters to a SQLAlchemy query.
        """
        if search_term:
            search_term = f"%{search_term}%"
            query = query.filter(
                    or_(
                        Expense.name.ilike(search_term)
                    )
                )
        return query
    
    @classmethod
    def add_expense(cls, name, amount, trip_id, **kwargs):
        
        itinerary = cls(name=name, amount=amount, trip_id=trip_id)
        
        # Set additional attributes from kwargs
        if kwargs.items():
            for key, value in kwargs.items():
                setattr(itinerary, key, value)
        
        db.session.add(itinerary)
        db.session.commit()
        
        return itinerary
    
    def update(self, commit: bool = True, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)
        
        if commit:
            db.session.commit()
    
    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'created_at': to_gmt1_or_none(self.created_at),
        }

