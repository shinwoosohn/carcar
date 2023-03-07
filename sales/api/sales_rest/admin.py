from django.contrib import admin
from .models import SalesPerson, Customer, SalesHistory, AutomobileVO
# Register your models here.

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

@admin.register(SalesHistory)
class SalesHistoryAdmin(admin.ModelAdmin):

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
