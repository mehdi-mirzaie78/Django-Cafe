from django.contrib import admin
from core.admin import BaseAdmin
from .models import Cafe, Contact, Menu


@admin.register(Cafe)
class CafeAdmin(BaseAdmin):
    pass


@admin.register(Contact)
class ContactAdmin(BaseAdmin):
    pass


@admin.register(Menu)
class MenuAdmin(BaseAdmin):
    pass
