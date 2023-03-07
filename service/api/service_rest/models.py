from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    vin = models.CharField(max_length=17, unqiue=True)

class Technician(models.Model):
    employee_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)
