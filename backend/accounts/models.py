from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from core.validators import phone_regex_validator
from .managers import MyUserManager


class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        max_length=13,
        unique=True,
        validators=[phone_regex_validator],
        verbose_name=_("Phone Number"),
    )
    email = models.EmailField(
        max_length=255, unique=True, verbose_name=_("Email"), null=True, blank=True
    )
    first_name = models.CharField(max_length=20, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=20, verbose_name=_("Last Name"))
    image = models.ImageField(null=True, blank=True, verbose_name=_("Image"))

    class GenderChoices(models.TextChoices):
        MALE = "male", "Male"
        FEMALE = "female", "Female"
        OTHER = "other", "Other"
        NOT_SPECIFIED = "not_specified", "Not Specified"

    gender = models.CharField(
        max_length=20,
        verbose_name=_("Gender"),
        choices=GenderChoices.choices,
        default=GenderChoices.NOT_SPECIFIED,
    )
    is_active = models.BooleanField(default=True, verbose_name=_("Activation Status"))
    is_admin = models.BooleanField(default=False, verbose_name=_("Admin Status"))
    is_staff = models.BooleanField(default=False, verbose_name=_("Staff Status"))
    is_superuser = models.BooleanField(
        default=False, verbose_name=_("Superuser Status")
    )

    objects = MyUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return f"{self.full_name} - {self.email}"

    def save(self, *args, **kwargs):
        self.phone = "0" + self.phone[3:] if len(self.phone) == 13 else self.phone
        super(User, self).save(*args, **kwargs)

    def role(self):
        return "Super User" if self.is_superuser else self.groups.get()

    role.short_description = _("Role")
