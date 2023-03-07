from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import SalesPerson, Customer, SalesHistory, AutomobileVO
from common.json import ModelEncoder


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_person", "employee_number", "id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["customer_name", "id"]

class SalesHistoryEncoder(ModelEncoder):
    model = SalesHistory
    properties = ["seller", "buyer","sale_price" ]
    def get_extra_data(self, o):
        return {"vin_number": o.sold_auto_vin.vin_number}

class AutoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin_number", "available_for_sale"]


@require_http_methods(["GET", "POST"])
def api_list_sales_persons (request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        new_sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            new_sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customers (request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        new_customer = Customer.objects.create(**content)
        return JsonResponse(
            new_customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_sales_history (request):
    if request.method == "GET":
        sales_history = SalesHistory.objects.all()
        return JsonResponse(
            {"sales_history": sales_history},
            encoder=SalesHistoryEncoder,
        )

    else:
        content = json.loads(request.body)

        automobile = content["sold_auto_vin"]

        sold_auto = AutomobileVO.objects.get(vin_number=automobile)

        content["sold_auto_vin"] = sold_auto

        new_sale = SalesHistory.objects.create(**content)
        sold_auto.available_for_sale = False
        sold_auto.save()
        return JsonResponse(
            new_sale,
            encoder=SalesHistoryEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_list_available_autos (request):
    autos = AutomobileVO.objects.filter(available_for_sale=True)
    return JsonResponse(
        autos,
        encoder=AutoEncoder,
        safe=False,
    )
