from django.urls import path
from .views import api_list_technicians, api_list_appointments, api_update_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_update_appointment, name="api_update_appointment"),
    path("appointments/vin/<str:vin>/", api_list_appointments, name="api_list_appointment_history")

]
