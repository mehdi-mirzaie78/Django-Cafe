from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings
from .managers import BaseManager


class BaseModel(models.Model):
    class Meta:
        abstract = True
        ordering = ["-created_at"]

    objects = BaseManager()

    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("Created Datetime"),
        help_text=_("This is the datetime when the object was created."),
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name=_("Updated Datetime"),
        help_text=_("This is the datetime when the object was last updated."),
    )
    deleted_at = models.DateTimeField(
        null=True,
        blank=True,
        editable=False,
        verbose_name=_("Deleted Datetime"),
        help_text=_("This is the datetime when the object was deleted."),
    )

    restored_at = models.DateTimeField(
        null=True,
        blank=True,
        editable=False,
        verbose_name=_("Restored Datetime"),
        help_text=_("This is the datetime when the object was restored."),
    )

    is_deleted = models.BooleanField(
        default=False,
        editable=False,
        db_index=True,
        verbose_name=_("Deleted status"),
        help_text=_("This indicates whether the object is deleted or not."),
    )

    is_active = models.BooleanField(
        default=True,
        editable=False,
        verbose_name=_("Active status"),
        help_text=_("This indicates whether the object is active or not."),
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


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
