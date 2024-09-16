from app.extensions import db
from sqlalchemy.orm import backref
from datetime import datetime

from ..utils.date_time import DateTimeUtils, to_gmt1_or_none

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(128), nullable=False)
    media_path = db.Column(db.String(256), nullable=True) # False
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)

    def __repr__(self) -> str:
        return f"<Media {self.id}, Filename: {self.filename}>"
    
    def get_path(self) -> str:
        return self.media_path

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'filename': self.filename,
            'media_path': self.media_path,
            'created_at': to_gmt1_or_none(self.created_at),
        }