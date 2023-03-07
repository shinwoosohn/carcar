from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "technician_name",
        "employee_id",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO,
    properties = [
        "import_href",
        "vin",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        "date_time",
        "reason",
        "vip",
        "finished",
        "technician_name",
        "id",
    ]
    encoders = {
        "technician_name": TechnicianListEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technicians = Technician.objects.create(**content)
            return JsonResponse(
                technicians,
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                    {"message": "Could not create the technician"},
                    status=400,
                )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=None):
    if request.method == "GET":
        if vin is not None:
            try:
                appointments = Appointment.objects.filter(vin=vin)
                return JsonResponse(
                    {"appointments": appointments},
                    encoder=AppointmentEncoder
                )
            except Appointment.DoesNotExist:
                return JsonResponse(
                    {"message": "Appointment does not exist"},
                    status=404,
                )
        else:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder
            )

    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(technician_name=content["technician_name"])
            content["technician_name"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404,
            )

        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True
        else:
            content["vip"] = False

        appointments = Appointment.objects.create(**content)
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "PUT"])
def api_update_appointment(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404,
            )

    else:
        content = json.loads(request.body)
        try:
            if "appointment" in content:
                appointment = Appointment.objects.get(id=pk)
                content["appointment"] = appointment
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404,
            )

        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
