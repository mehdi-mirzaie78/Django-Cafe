from django.contrib import admin
from django.utils import timezone


class BaseAdmin(admin.ModelAdmin):
    @admin.action(description="Locical Delete")
    def logical_delete(self, request, queryset):
        queryset.update(deleted_at=timezone.now(), is_deleted=True, is_active=False)
        queryset.update(updated_by=request.user)

    @admin.action(description="Logical Restore")
    def logical_restore(self, request, queryset):
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

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.created_by = request.user
        if change:
            obj.updated_by = request.user
        super().save_model(request, obj, form, change)

    readonly_fields = [
        "created_at",
        "deleted_at",
        "restored_at",
        "updated_at",
        "is_deleted",
        "is_active",
        "created_by",
        "updated_by",
    ]

    actions = ["logical_delete", "logical_restore", "deactivate", "activate"]


class BaseTabularInline(admin.TabularInline):
    readonly_fields = [
        "created_at",
        "deleted_at",
        "restored_at",
        "updated_at",
        "is_deleted",
        "is_active",
        "created_by",
        "updated_by",
    ]
    # def save_formset(self, request, obj, formset, change):
    #     instances = formset.save(commit=False)
    #     for instance in instances:
    #         if not instance.pk:
    #             instance.created_by = request.user
    #         if instance.changed_data:
    #             instance.updated_by = request.user
    #         instance.save()
    #     formset.save()

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.created_by = request.user
        if change:
            obj.updated_by = request.user
        super().save_model(request, obj, form, change)

    def get_extra(self, request, obj=None, **kwargs):
        if obj:
            return 0
        return 1
