from django.contrib import admin
from django.urls import path
from .views import api_list_available_autos, api_list_customers, api_list_sales_persons, api_list_sales_history

urlpatterns = [
    path("sales_persons/", api_list_sales_persons, name="api_list_sales_persons"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("sales_history/", api_list_sales_history, name="api_list_sales_history"),
    path("automobiles/", api_list_available_autos, name="api_list_available_autos"),
]
