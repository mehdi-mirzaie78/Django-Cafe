from django.db import models
from django.core.validators import FileExtensionValidator as FileExtension
from django.utils.translation import gettext_lazy as _
from core.models import BaseModel, SingletonModel


class Cafe(BaseModel, SingletonModel):
    class Meta:
        verbose_name = _("Cafe")
        verbose_name_plural = _("Cafe")

    title = models.CharField(max_length=255, verbose_name=_("Title"))
    motto = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Motto")
    )
    about = models.TextField(null=True, blank=True, verbose_name=_("About"))
    logo = models.ImageField(verbose_name=_("Logo"), default="logo.png")
    icon = models.ImageField(verbose_name=_("Icon"), default="icon.png")
    video = models.FileField(
        default="video.mp4",
        verbose_name=_("Video"),
        validators=[FileExtension(["mp4"])],
    )

    def __str__(self) -> str:
        return f"{self.title}'s Cafe"


class Contact(BaseModel, SingletonModel):
    class Meta:
        verbose_name = _("Contact")
        verbose_name_plural = _("Contact")

    cafe = models.OneToOneField(
        Cafe,
        on_delete=models.CASCADE,
        related_name="contact",
        verbose_name=_("Cafe"),
        default=1,
    )
    email = models.EmailField(null=True, blank=True, verbose_name=_("Email"))
    instagram = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Instagram")
    )
    telegram = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Telegram")
    )
    whatsapp = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Whatsapp")
    )
    facebook = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Facebook")
    )
    phone = models.CharField(
        max_length=30, null=True, blank=True, verbose_name=_("Phone")
    )

    def __str__(self) -> str:
        return f"{self.email}'s Contact"
