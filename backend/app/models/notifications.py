from datetime import datetime, timezone
from sqlalchemy import inspect, or_
from enum import Enum

from app.extensions import db
from ..utils.date_time import DateTimeUtils, to_gmt1_or_none



class MessageStatus(Enum):
    READ = 'read'
    UNREAD = 'unread'

class NotificationType(Enum):
    MESSAGE = 'message'
    NOTIFICATION = 'notification'
    ACTIVITY = 'activity'



# Notification model
class Notification(db.Model):
    __tablename__ = 'notification'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    notification_type = db.Column(db.Enum(NotificationType), nullable=False, default=NotificationType.MESSAGE)
    title = db.Column(db.String(255), nullable=True)
    body = db.Column(db.Text, nullable=True, default=None)
    read = db.Column(db.Boolean, nullable=True, default=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=DateTimeUtils.aware_utcnow, onupdate=DateTimeUtils.aware_utcnow)
    recipient_id = db.Column(db.Integer, db.ForeignKey('app_user.id'), nullable=True)

    # Relationships
    recipients = db.relationship('AppUser', backref=db.backref('notifications', lazy='dynamic'))

    def __repr__(self):
        return f'<Notification id: {self.id}>, type: {self.notification_type}'
    
    
    @staticmethod
    def add_search_filters(query, search_term):
        """
        Adds search filters to a SQLAlchemy query.
        """
        if search_term:
            search_term = f"%{search_term}%"
            query = query.filter(
                    or_(
                        Notification.title.ilike(search_term),
                        Notification.body.ilike(search_term)
                    )
                )
        return query

    @classmethod
    def add_notification(cls, recipients, body, notification_type=NotificationType.NOTIFICATION, commit=True, **kwargs):
        """
        Send a notification from an admin to multiple recipients.

        Args:
            admin (User): The admin user sending the notification.
            recipients (list of User): List of recipient users.
            body (str): Body of the notification message.
            notification_type (NotificationType): Type of the notification message.
        """
        message = cls(recipients=recipients, body=body, notification_type=notification_type)
        db.session.add(message)
        
        # Set additional attributes from kwargs
        if kwargs.items():
            for key, value in kwargs.items():
                setattr(message, key, value)
        
        if commit:
            db.session.commit()

        return message
        

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            "type": self.notification_type.value,
            "title": self.title,
            "body": self.body,
            "read": self.read,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
