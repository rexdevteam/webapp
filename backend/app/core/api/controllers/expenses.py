from ast import List
from flask import request
from datetime import datetime
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )

from ....extensions import db
from ....models import AppUser, Trip, Itinerary, Expense
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user
from ....utils.helpers.export_xl import export_to_excel

class ExpensesController:
    @staticmethod
    def get_expense():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("per_page", 5, type=int)
            search_term = request.args.get("search")
            
            query = Expense.query.order_by(Expense.name.desc())
            query = Expense.add_search_filters(query, search_term)
            
            if request.args.get('export', '').lower() == "excel":
                filename = "expenses"
                return export_to_excel(query.all(), filename)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            expenses: list[Expense] = pagination.items
            current_trips = [expense.to_dict() for expense in expenses]
            extra_data = {
                "total": pagination.total,
                "expenses": current_trips,
                "current_page": pagination.page,
                "total_pages": pagination.pages,
            }
            
            api_response = success_response("expenses fetched successfully", 200, extra_data)
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred fetching expenses', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting users:", e)
        
        return api_response
    
    
    @staticmethod
    def add_expense():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            data = request.get_json()

            name = data.get('name')
            amount = data.get('amount')
            trip_id = data.get('trip_id')
            
            
            expenses = data.get('expenses', [])
            
            if not name or not amount or not trip_id:
                return error_response("Invalid data", 400)
            
            # Create expense
            new_itinerary = Expense.add_expense(name=name, amount=amount, trip_id=trip_id)
            
            
            db.session.commit()
            
            extra_data = {"expense": new_itinerary.to_dict()}
            
            api_response = success_response("Expense added successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred adding new expense', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred adding a expense:", e)
        finally:
            db.session.close()
        
        return api_response
    
    
    @staticmethod
    def get_expense(expense_id: int):
        try:
            expense: Expense = Expense.query.get(expense_id)
            if not expense:
                return error_response("Expense not found", 404)
            
            extra_data = {"expense": expense.to_dict()}
            
            api_response = success_response("Expense fetched successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error connecting to the database.', 500)
            log_exception('Database error occurred getting a expense', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred getting a expense:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def edit_expense(expense_id: int):
        try:
            expense: Expense = Expense.query.get(expense_id)
            if not expense:
                return error_response("Expense not found", 404)
            
            data = request.get_json()
            name = data.get('name', expense.name if expense else "")
            amount = data.get('amount', expense.amount if expense else "")
            
            if not name or not amount:
                return error_response("Invalid data", 400)
            
            
            # Update estate details
            expense.update(name=name, amount=amount)
            
            extra_data = {"expense": expense.to_dict()}
            
            api_response = success_response("Expense updated successfully", 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            log_exception('Database error occurred updating a expense', e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred updating a expense:", e)
        finally:
            db.session.close()
        
        return api_response
    
    @staticmethod
    def delete_expense(expense_id: int):
        try:
            expense: Expense = Expense.query.get(expense_id)
            if not expense:
                return error_response("Expense not found", 404)
            
            expense.delete()
            
            api_response = success_response("expense deleted successfully", 200)
            
        except (DataError, DatabaseError) as e:
            api_response = error_response('Error interacting with the database.', 500)
            log_exception('Database error occurred deleting a expense', e)
        except Exception as e:
            api_response = error_response("An unexpected error occurred. Our developers are looking into this.", 500)
            log_exception("An exception occurred deleting a expense:", e)
        finally:
            db.session.close()
        
        return api_response

