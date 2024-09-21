'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''

from flask import request
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )

from ....extensions import db
from ....models import Notification
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user
from ....utils.helpers.export_xl import export_to_excel

class NotificationsController:
    @staticmethod
    def get_notifications():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            search_term = request.args.get("search")
            
            query = Notification.query.filter(Notification.recipient_id==current_user.id).order_by(Notification.created_at.desc())
            query = Notification.add_search_filters(query, search_term)
            
            if request.args.get('export', '').lower() == "excel":
                filename = "notifications"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            notifications: list[Notification] = pagination.items
            current_trips = [notification.to_dict() for notification in notifications]
            extra_data = {
                "total": pagination.total,
                "notifications": current_trips,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("Notifications fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred fetching notifications', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting users:", e)
        
        return api_response
    
    
    @staticmethod
    def get_notification(notification_id: int):
        try:
            notification: Notification = Notification.query.get(notification_id)
            if not notification:
                return error_response("Notification not found", 404)
            
            extra_data = {"notification": notification.to_dict()}
            
            api_response = success_response("Notification fetched successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error connecting to the database.', 500)
            log_exception('Database error occurred getting a notification', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting a notification:", e)
        finally:
            db.session.close()
        
        return api_response
    
    
    @staticmethod
    def delete_notification(notification_id: int):
        try:
            notification: Notification = Notification.query.get(notification_id)
            if not notification:
                return error_response("Notification not found", 404)
            
            notification.delete()
            
            api_response = success_response("Notification deleted successfully", 200)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error interacting with the database.', 500)
            log_exception('Database error occurred deleting a notification', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred deleting a notification:", e)
        finally:
            db.session.close()
        
        return api_response
