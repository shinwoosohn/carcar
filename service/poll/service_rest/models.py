from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    vin = models.CharField(max_length=17, unqiue=True)

    def __str__(self):
        return self.vin





class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.technician_name




class Appointment(models.Model):
    vin = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    date_time = models.DateTimeField(auto_now=False)
    reason = models.CharField(max_length=200, null=True)
    vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    technician_name = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.customer_name
