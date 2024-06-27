from django.db import models


class BaseManager(models.Manager):
    def get_archive(self):
        return super().get_queryset()

    def get_active_list(self):
        return super().get_queryset().filter(is_active=True, is_deleted=False)

    def get_deleted_list(self):
        return super().get_queryset().filter(is_deleted=True)

    def get_deactivated_list(self):
        return super().get_queryset().filter(is_active=False)
