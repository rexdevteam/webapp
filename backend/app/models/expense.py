from app.extensions import db

from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)

    def __repr__(self) -> str:
        return f"<Trip {self.id}, name: {self.name}>"
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'created_at': to_gmt1_or_none(self.created_at),
        }

