from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import (
    MinValueValidator as Min,
    MaxValueValidator as Max,
    FileExtensionValidator as FileExtension,
)
from core.models import BaseModel


class Category(BaseModel):
    parent_category = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="sub_categories",
        verbose_name=_("Parent Category"),
    )
    is_parent = models.BooleanField(default=False, verbose_name=_("Is Parent Category"))
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_("Slug"))
    description = models.TextField(null=True, blank=True, verbose_name=_("Description"))

    class Meta:
        ordering = ["is_parent", "name"]
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self) -> str:
        return (
            self.name
            if self.parent_category is None
            else f"{self.parent_category} - {self.name}"
        )


class Product(BaseModel):
    categories = models.ManyToManyField(
        Category, related_name="products", verbose_name=_("Categories")
    )
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    slug = models.SlugField(max_length=255, verbose_name=_("Slug"))
    description = models.TextField(null=True, blank=True, verbose_name=_("Description"))
    unit_price = models.PositiveIntegerField(verbose_name=_("Unit Price"))
    discount = models.PositiveIntegerField(
        default=0,
        verbose_name=_("Discount"),
        validators=[Min(0), Max(70)],
    )
    price = models.PositiveIntegerField(verbose_name=_("Price"))
    stock = models.PositiveIntegerField(verbose_name=_("Stock"))

    @property
    def is_available(self):
        return self.stock > 0

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def save(self, *args, **kwargs):
        self.price = self.unit_price - (self.unit_price * self.discount / 100)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Media(BaseModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="medias",
        related_query_name="media",
        verbose_name=_("Product"),
    )

    class MediaTypeChoices(models.TextChoices):
        VIDEO = "video", _("Video")
        IMAGE = "image", _("Image")

    file_type = models.CharField(
        max_length=20, choices=MediaTypeChoices.choices, verbose_name=_("File Type")
    )
    file = models.FileField(
        verbose_name=_("File"),
        validators=[FileExtension(["mp4", "png", "jpg", "jpeg"])],
    )

    def __str__(self) -> str:
        return f"{self.product} - {self.file.name}"
