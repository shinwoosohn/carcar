from django.db import models


class SalesPerson(models.Model):
    sales_person = models.CharField(max_length=200)
    email = models.EmailField()



class Customer(models.Model):
    customer_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)



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

class AutomobileVO(models.Model):
