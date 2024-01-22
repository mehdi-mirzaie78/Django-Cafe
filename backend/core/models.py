from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings
from .managers import BaseManager


class BaseModel(models.Model):
    class Meta:
        abstract = True

    objects = BaseManager()

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    deleted_at = models.DateTimeField(
        null=True,
        blank=True,
        editable=False,
        verbose_name=_("Deleted Datetime"),
        help_text=_("This is datetime when the object was deleted."),
    )

    restored_at = models.DateTimeField(
        null=True,
        blank=True,
        editable=False,
        verbose_name=_("Restored Datetime"),
        help_text=_("This is datetime when the objects was restored"),
    )

    is_deleted = models.BooleanField(
        default=False,
        editable=False,
        db_index=True,
        verbose_name=_("Deleted status"),
        help_text=_("This is deleted status"),
    )

    is_active = models.BooleanField(
        default=True,
        editable=False,
        verbose_name=_("Active status"),
        help_text=_("This is active status"),
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="%(class)s_created_by",
        null=True,
        blank=True,
    )

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="%(class)s_updated_by",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def logical_delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.is_deleted = True
        self.save(using=using)

    def logical_restore(self):
        self.restored_at = timezone.now()
        self.is_deleted = False
        self.save()

    def deactivate(self):
        self.is_active = False
        self.save()

    def activate(self):
        self.is_active = True
        self.save()