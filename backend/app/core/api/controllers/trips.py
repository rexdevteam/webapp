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

class TripsController:
    @staticmethod
    def get_trips():
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
            current_trips = [trip.to_dict() for trip in trips]
            extra_data = {
                "total": pagination.total,
                "trips": current_trips,
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
    def add_trip():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            data = request.get_json()

            destination = data.get('destination')
            amount = data.get('amount')
            start_date_data = data.get('start_date', "")
            end_date_data = data.get('end_date', "")
            
            if not start_date or not end_date:
                return error_response("Start and End date must be provided", 400)
            
            start_date = datetime.strptime(start_date_data, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_data, '%Y-%m-%d').date()
            
            itineraries = data.get('itineraries', [])
            
            if not destination or not amount:
                return error_response("Invalid data", 400)
            
            # Create Trip
            new_trip = Trip.add_trip(destination=destination, amount=amount, app_user_id=current_user.id, start_date=start_date, end_date=end_date)
            
            if len(itineraries) > 0:
                for itinerary in itineraries:
                    category_id = itinerary.get('category_id')
                    name = itinerary.get('name')
                    itinerary_amount = itinerary.get('itinerary_amount')
                    
                    itinerary_item = Itinerary(
                        name=name,
                        amount=itinerary_amount,
                        trip_id=new_trip.id,
                        category_id=category_id
                    )
                    db.session.add(itinerary_item)

            db.session.commit()
            
            extra_data = {"trip": new_trip.to_dict()}
            
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
    
    
    @staticmethod
    def get_trip(trip_id: int):
        try:
            trip: Trip = Trip.query.get(trip_id)
            if not trip:
                return error_response("Trip not found", 404)
            
            extra_data = {"trip": trip.to_dict()}
            
            api_response = success_response("trip fetched successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error connecting to the database.', 500)
            log_exception('Database error occurred getting a trip', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting a trip:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def edit_trip(trip_id: int):
        try:
            trip: Trip = Trip.query.get(trip_id)
            if not trip:
                return error_response("Trip not found", 404)
            
            data = request.get_json()
            destination = data.get('destination', trip.destination)
            amount = data.get('amount', trip.amount)
            start_date_data = data.get('start_date', "")
            end_date_data = data.get('end_date', "")
            
            
            if not destination or not amount:
                return error_response("Invalid data", 400)
            
            if not start_date or not end_date:
                return error_response("Start and End date must be provided", 400)
            
            start_date = datetime.strptime(start_date_data, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_data, '%Y-%m-%d').date()
            
            
            
            # Update estate details
            trip.update(destination=destination, amount=amount, start_date=start_date, end_date=end_date)
            
            extra_data = {"trip": trip.to_dict()}
            
            api_response = success_response("trip updated successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred updating a trip', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred updating a trip:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def delete_trip(trip_id: int):
        try:
            trip: Trip = Trip.query.get(trip_id)
            if not trip:
                return error_response("Trip not found", 404)
            
            # itineraries = Itinerary.query.filter_by(trip_id=trip.id).all()
            
            trip.delete()
            
            api_response = success_response("trip deleted successfully", 200)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error interacting with the database.', 500)
            log_exception('Database error occurred deleting a trip', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred deleting a trip:", e)
        finally:
            db.session.close()
        
        return api_response
