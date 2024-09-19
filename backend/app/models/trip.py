from os import name
from app.extensions import db
from datetime import datetime

from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    start_date = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    end_date = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)

    def __repr__(self) -> str:
        return f"<Trip {self.id}, destination: {self.destination}>"
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'destination': self.destination,
            'amount': self.amount,
            'start_date': to_gmt1_or_none(self.start_date),
            'end_date': to_gmt1_or_none(self.end_date),
            'created_at': to_gmt1_or_none(self.created_at),
        }


class Itinerary(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount
        }