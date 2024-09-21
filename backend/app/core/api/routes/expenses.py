'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ....utils.decorators import roles_required
from ..controllers import ExpensesController


@api_bp.route("/expenses", methods=["GET", "POST"])
@jwt_required()
def expenses():
    if request.method == "GET":
        return ExpensesController.get_expenses()
    elif request.method == "POST":
        return ExpensesController.add_expense()



@api_bp.route("/expenses/<expense_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def manage_expenses(expense_id):
    if request.method == "Get":
        return ExpensesController.get_expense(expense_id)
    if request.method == "PUT":
        return ExpensesController.edit_expense(expense_id)
    elif request.method == "DELETE":
        return ExpensesController.delete_expense(expense_id)
