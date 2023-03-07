from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import SalesPerson, Customer, SalesHistory, AutomobileVO
from common.json import ModelEncoder


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_number", "id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "id"]

class SalesHistoryEncoder(ModelEncoder):
    model = SalesHistory
    properties = ["seller", "buyer","sale_price", "sold_auto" ]

class AutoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin_number", "available_for_sale"]



@require_http_methods(["GET", "POST"])
def api_list_sales_persons (request):




@require_http_methods(["GET", "POST"])
def api_list_customers (request):




@require_http_methods(["GET", "POST"])
def api_list_saleshistory (request):



@require_http_methods(["GET", "POST"])
def api_list_available_autos (request):
