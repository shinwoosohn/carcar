from django.db import models

class AutomobileVO(models.Model):
    vin_number = models.CharField(max_length=24)
    available_for_sale = models.BooleanField(default=True)

class SalesPerson(models.Model):
    sales_person = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=24)
    def _str__(self):
        return self.sales_person


class Customer(models.Model):
    customer_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    def _str__(self):
        return self.customer_name


class SalesHistory(models.Model):

    sale_price = models.DecimalField(max_digits=8, decimal_places=2)

    seller = models.ForeignKey(
        SalesPerson,
        related_name="seller",
        on_delete=models.PROTECT
    )
    buyer = models.ForeignKey(
        Customer,
        related_name="buyer",
        on_delete=models.PROTECT
    )
    sold_auto = models.ForeignKey(
        AutomobileVO,
        related_name="sold_auto",
        on_delete=models.PROTECT
    )
    def _str__(self):
        return "Sales History"
