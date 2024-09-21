from ast import List
from flask import request
from datetime import datetime
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )

from ....extensions import db
from ....models import AppUser, Trip, Itinerary
from ....utils.helpers.basics import generate_random_string
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user
from ....utils.helpers.export_xl import export_to_excel
from ....utils.emailing.pwd import send_password_email

class ItineraryController:
    @staticmethod
    def get_itineraries():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            search_term = request.args.get("search")
            
            query = Itinerary.query.filter(Itinerary.app_user_id==current_user.id).order_by(Itinerary.name.desc())
            query = Itinerary.add_search_filters(query, search_term)
            
            if request.args.get('export', '').lower() == "excel":
                filename = "itineraries"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            itineraries: list[Itinerary] = pagination.items
            current_trips = [itinerary.to_dict() for itinerary in itineraries]
            extra_data = {
                "total": pagination.total,
                "itineraries": current_trips,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("itineraries fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred fetching itineraries', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting users:", e)
        
        return api_response
    
    
    @staticmethod
    def add_itinerary():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            data = request.get_json()

            name = data.get('name')
            amount = data.get('amount')
            trip_id = data.get('trip_id')
            category_id = data.get('category_id')
            
            
            itineraries = data.get('itineraries', [])
            
            if not name or not amount:
                return error_response("Invalid data", 400)
            
            # Create itinerary
            new_itinerary = Itinerary.add_itinerary(name=name, amount=amount, category_id=category_id, trip_id=trip_id)
            
            
            db.session.commit()
            
            extra_data = {"itinerary": new_itinerary.to_dict()}
            
            api_response = success_response("Itinerary added successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred adding new itinerary', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred adding a itinerary:", e)
        finally:
            db.session.close()
        
        return api_response
    
    
    @staticmethod
    def get_itinerary(itinerary_id: int):
        try:
            itinerary: Itinerary = Itinerary.query.get(itinerary_id)
            if not itinerary:
                return error_response("Itinerary not found", 404)
            
            extra_data = {"itinerary": itinerary.to_dict()}
            
            api_response = success_response("Itinerary fetched successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error connecting to the database.', 500)
            log_exception('Database error occurred getting a itinerary', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting a itinerary:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def edit_itinerary(itinerary_id: int):
        try:
            itinerary: Itinerary = Itinerary.query.get(itinerary_id)
            if not itinerary:
                return error_response("Itinerary not found", 404)
            
            data = request.get_json()
            name = data.get('name', itinerary.name)
            amount = data.get('amount', itinerary.amount)
            trip_id = data.get('trip_id', itinerary.trip_id)
            category_id = data.get('category_id', itinerary.category_id)
            
            if not name or not amount or not category_id:
                return error_response("Invalid data", 400)
            
            
            # Update estate details
            itinerary.update(name=name, amount=amount, category_id=category_id, trip_id=trip_id)
            
            extra_data = {"itinerary": itinerary.to_dict()}
            
            api_response = success_response("Itinerary updated successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred updating a Itinerary', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred updating a Itinerary:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def delete_itinerary(itinerary_id: int):
        try:
            itinerary: Itinerary = Itinerary.query.get(itinerary_id)
            if not itinerary:
                return error_response("Itinerary not found", 404)
            
            # itineraries = Itinerary.query.filter_by(itinerary_id=itinerary.id).all()
            
            itinerary.delete()
            
            api_response = success_response("itinerary deleted successfully", 200)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error interacting with the database.', 500)
            log_exception('Database error occurred deleting a Itinerary', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred deleting a Itinerary:", e)
        finally:
            db.session.close()
        
        return api_response

