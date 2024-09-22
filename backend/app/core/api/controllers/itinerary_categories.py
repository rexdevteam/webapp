from flask import request
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )

from ....extensions import db
from ....models import ItineraryCategory
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user
from ....utils.helpers.export_xl import export_to_excel

class ItineraryCatController:
    @staticmethod
    def get_itinerary_cats():
        try:
            
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            search_term = request.args.get("search")
            
            query = ItineraryCategory.query.order_by(ItineraryCategory.name.desc())
            query = ItineraryCategory.add_search_filters(query, search_term)
            
            if request.args.get('export', '').lower() == "excel":
                filename = "itinerary_cats"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            itinerary_cats: list[ItineraryCategory] = pagination.items
            current_trips = [itinerary_cat.to_dict() for itinerary_cat in itinerary_cats]
            extra_data = {
                "total": pagination.total,
                "itinerary_cats": current_trips,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("Categories fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred fetching itinerary_cats', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting users:", e)
        
        return api_response
    
    
    
    @staticmethod
    def get_itinerary_cat(itinerary_cat_id: int):
        try:
            itinerary_cat: ItineraryCategory = ItineraryCategory.query.get(itinerary_cat_id)
            if not itinerary_cat:
                return error_response("Itinerary Category not found", 404)
            
            extra_data = {"itinerary_cat": itinerary_cat.to_dict()}
            
            api_response = success_response("Itinerary Category fetched successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error connecting to the database.', 500)
            log_exception('Database error occurred getting a ItineraryCategory', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting a ItineraryCategory:", e)
        finally:
            db.session.close()
        
        return api_response
    

