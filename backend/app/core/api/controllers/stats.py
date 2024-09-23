from sqlalchemy import func
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, )

from ....models import AppUser, Trip, Itinerary, Expense
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user


class StatsController:
    
    @staticmethod
    def get_stat_numbers():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            # Total trips count and total amount
            trip_query = Trip.query.filter(Trip.app_user_id == current_user.id)
            total_trips = trip_query.count()
            total_trip_amount = trip_query.with_entities(func.sum(Trip.amount)).scalar() or 0
            
            # Total itineraries count and total amount
            itineraries_query = Itinerary.query.join(Trip).filter(Trip.app_user_id == current_user.id)
            total_itineraries = itineraries_query.count()
            total_itinerary_amount = itineraries_query.with_entities(func.sum(Itinerary.amount)).scalar() or 0

            # Total expenses count and total amount
            expenses_query = Expense.query.join(Trip).filter(Trip.app_user_id == current_user.id)
            total_expenses = expenses_query.count()
            total_expense_amount = expenses_query.with_entities(func.sum(Expense.amount)).scalar() or 0
            

            stats = {
                "total_trips": total_trips,
                "total_itineraries": total_itineraries,
                "total_expenses": total_expenses,
                "total_trip_amount": total_trip_amount,
                "total_itinerary_amount": total_itinerary_amount,
                "total_expense_amount": total_expense_amount,
            }
            extra_data = {"stats": stats}
            
            api_response = success_response("Stat numbers fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception("Database error occurred fetching stat numbers", e)
            api_response = error_response('Error interacting with the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred fetching stat numbers:", e)
        
        return api_response


