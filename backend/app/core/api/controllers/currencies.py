from ast import List
from flask import request
from datetime import datetime
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )

from ....extensions import db
from ....models import Role, RoleNames, AppUser, Trip, Itinerary
from ....utils.helpers.basics import generate_random_string
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user
from ....utils.helpers.export_xl import export_to_excel
from ....utils.emailing.pwd import send_password_email

class CurrenciesController:
    @staticmethod
    def get_currencies():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            search_term = request.args.get("search")
            
            query = Trip.query.filter(Trip.app_user_id==current_user.id).order_by(Trip.created_at.desc())
            query = Trip.add_search_filters(query, search_term)
            
            if request.args.get('export', '').lower() == "excel":
                filename = "trips"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            trips: list[Trip] = pagination.items
            current_currencies = [trip.to_dict() for trip in trips]
            extra_data = {
                "total": pagination.total,
                "trips": current_currencies,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("Trips fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred fetching trips', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting users:", e)
        
        return api_response
    
    
    @staticmethod
    def update_currency():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            data = request.get_json()

            destination = data.get('destination')
            amount = data.get('amount')
            start_date_data = data.get('start_date', "")
            end_date_data = data.get('end_date', "")
            
            if not start_date_data or not end_date_data:
                return error_response("Start and End date must be provided", 400)
            
            start_date = datetime.strptime(start_date_data, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_data, '%Y-%m-%d').date()
            
            itineraries = data.get('itineraries', [])
            
            if not destination or not amount:
                return error_response("Invalid data", 400)
            
            # Create Trip
            new_currency = Trip.add_currency(destination=destination, amount=amount, app_user_id=current_user.id, start_date=start_date, end_date=end_date)
            
            console_log("itineraries data", itineraries)
            
            if len(itineraries) > 0:
                for itinerary in itineraries:
                    category_id = itinerary.get('category_id')
                    name = itinerary.get('name')
                    itinerary_amount = itinerary.get('amount')
                    
                    console_log("itinerary data", itinerary)
                    console_log("itinerary data", f"{category_id}{name}{itinerary_amount}")
                    
                    if not category_id or not name or not itinerary_amount:
                        return error_response("Invalid itinerary data", 400)
                    
                    itinerary_item = Itinerary(
                        name=name,
                        amount=itinerary_amount,
                        category_id=category_id,
                        currency_id=new_currency.id,
                    )
                    db.session.add(itinerary_item)

            db.session.commit()
            
            extra_data = {"trip": new_currency.to_dict()}
            
            api_response = success_response("Trip added successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred adding new trip', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred adding a trip:", e)
        finally:
            db.session.close()
        
        return api_response
    
