from django.contrib import admin
from core.admin import BaseAdmin
from .models import Cafe, Contact


@admin.register(Cafe)
class CafeAdmin(BaseAdmin):
    pass


@admin.register(Contact)
class ContactAdmin(BaseAdmin):
    pass
