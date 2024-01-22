from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from core.models import BaseModel


class Like(BaseModel):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
        related_name="likes",
    )
    product = models.ForeignKey(
        "products.Product",
        on_delete=models.CASCADE,
        verbose_name=_("Product"),
        related_name="likes",
    )

    class Meta:
        unique_together = ["user", "product"]
        verbose_name = _("Like")
        verbose_name_plural = _("Likes")

    def __str__(self) -> str:
        return f"Like #{self.pk} - {self.user} - {self.product}"


class Review(BaseModel):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
        related_name="reviews",
    )
    product = models.ForeignKey(
        "products.Product",
        on_delete=models.CASCADE,
        verbose_name=_("Product"),
        related_name="reviews",
    )
    score = models.PositiveIntegerField(
        default=0,
        verbose_name=_("Score"),
        validators=[Min(0), Max(5)],
    )
    comment = models.TextField(verbose_name=_("Comment"), null=True, blank=True)
    is_approved = models.BooleanField(default=False, verbose_name=_("Is Approved"))

    class Meta:
        unique_together = ["user", "product"]
        verbose_name = _("Review")
        verbose_name_plural = _("Reviews")

    def __str__(self) -> str:
        return f"Review #{self.pk} - {self.user} - {self.product} - {self.score}"
