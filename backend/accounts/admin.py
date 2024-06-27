from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .forms import UserChangeForm, UserCreationForm


@admin.register(get_user_model())
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    readonly_fields = ("last_login", "image_tag")
    list_display = (
        "email",
        "phone",
        "first_name",
        "last_name",
        "gender",
        "is_active",
        "is_staff",
        "role",
        "image_tag",
    )
    list_filter = ("is_active", "is_admin")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    ("first_name", "last_name", "gender"),
                    (
                        "email",
                        "phone",
                    ),
                    "password",
                    (
                        "image",
                        "image_tag",
                    ),
                    "last_login",
                )
            },
        ),
        (
            "Permissions",
            {
                "classes": ("collapse",),
                "fields": (
                    (
                        "is_active",
                        "is_admin",
                        "is_staff",
                        "is_superuser",
                    ),
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    (
                        "first_name",
                        "last_name",
                        "gender",
                    ),
                    (
                        "phone",
                        "email",
                    ),
                    (
                        "password1",
                        "password2",
                    ),
                    "image",
                )
            },
        ),
    )
    search_fields = ("email", "first_name", "last_name", "phone")
    ordering = ("email",)
    filter_horizontal = ("groups", "user_permissions")
    list_per_page = 10

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        if is_superuser:
            superuser_status = form.base_fields.get("is_superuser")
            if superuser_status:
                superuser_status.disabled = True
        return form
