from django.contrib import admin
from django.utils import timezone


class BaseAdmin(admin.ModelAdmin):
    @admin.action(description="Locical Delete")
    def logical_delete(self, request, queryset):
        queryset.update(deleted_at=timezone.now(), is_deleted=True, is_active=False)
        queryset.update(updated_by=request.user)

    @admin.action(description="Logical Restore")
    def logic_restore(self, request, queryset):
        queryset.update(restored_at=timezone.now(), is_deleted=False, is_active=True)
        queryset.update(updated_by=request.user)

    @admin.action(description="Deactivate")
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        queryset.update(updated_by=request.user)

    @admin.action(description="Activate")
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        queryset.update(updated_by=request.user)
