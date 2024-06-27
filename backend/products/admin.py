from django.contrib import admin
from core.admin import BaseAdmin, BaseTabularInline
from .models import Product, Category, Media


class MediaInline(BaseTabularInline):
    model = Media


@admin.register(Media)
class MediaAdmin(BaseAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(BaseAdmin):
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(BaseAdmin):
    readonly_fields = BaseAdmin.readonly_fields + ["price"]
    inlines = [MediaInline]
    filter_horizontal = ["categories"]
    prepopulated_fields = {"slug": ("name",)}
