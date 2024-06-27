from django.contrib import admin

from .models import CartItem, Cart, Order, OrderItem, Status, Table

# Register your models here.
admin.site.register([Cart, CartItem, Order, OrderItem, Table, Status])
