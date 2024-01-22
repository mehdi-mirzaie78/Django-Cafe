from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils.html import mark_safe
from core.validators import phone_regex_validator
from core.models import BaseModel
from .managers import MyUserManager


class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        max_length=13,
        unique=True,
        validators=[phone_regex_validator],
        verbose_name=_("Phone Number"),
    )
    email = models.EmailField(max_length=255, unique=True, verbose_name=_("Email"))
    first_name = models.CharField(max_length=20, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=20, verbose_name=_("Last Name"))
    image = models.ImageField(null=True, blank=True, verbose_name=_("Image"))

    class GenderChoices(models.TextChoices):
        MALE = "male", _("Male")
        FEMALE = "female", _("Female")
        OTHER = "other", _("Other")
        NOT_SPECIFIED = "not_specified", _("Not Specified")

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
        if len(self.phone) != 11:
            self.phone = "0" + self.phone[3:] if len(self.phone) == 13 else self.phone
        if not self.image:
            self.image = "default.png"
        super(User, self).save(*args, **kwargs)

    def role(self):
        return "Super User" if self.is_superuser else self.groups.get()

    role.short_description = _("Role")

    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" width="150" height="150" />')

    image_tag.short_description = _("Image")


class Address(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="addresses", verbose_name=_("User")
    )
    city = models.CharField(max_length=50, verbose_name=_("City"))
    detail = models.TextField(verbose_name=_("Detail"))
    zip_code = models.CharField(max_length=10, verbose_name=_("Zip Code"))

    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")

    def __str__(self) -> str:
        return f"{self.user.full_name} - {self.city}"
