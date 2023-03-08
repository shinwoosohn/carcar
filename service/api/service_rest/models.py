from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"pk": self.id})



class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.technician_name

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})




class Appointment(models.Model):
    vin = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    date_time = models.DateTimeField(auto_now=False)
    reason = models.CharField(max_length=200, null=True)
    vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    technician_name = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.customer_name

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
