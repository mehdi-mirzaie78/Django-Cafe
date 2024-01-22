from uuid import uuid4
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator as Max, MinValueValidator as Min
from core.models import BaseModel
from products.models import Product


class Table(BaseModel):
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    capacity = models.PositiveIntegerField(verbose_name=_("Capacity"))
    is_available = models.BooleanField(default=True, verbose_name=_("Is Available"))

    def __str__(self) -> str:
        return f"{self.name} - {self.capacity}"


class Status(BaseModel):
    name = models.CharField(max_length=255, verbose_name=_("Name"))
    description = models.TextField(null=True, blank=True, verbose_name=_("Description"))

    def __str__(self) -> str:
        return f"{self.pk}-{self.name}"


class Order(BaseModel):
    user = models.ForeignKey(
        "accounts.User",
        related_name="orders",
        related_query_name="order",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    table = models.ForeignKey(
        Table,
        related_name="orders",
        related_query_name="order",
        on_delete=models.CASCADE,
        verbose_name=_("Table"),
        null=True,
        blank=True,
    )
    status = models.ForeignKey(
        Status,
        on_delete=models.CASCADE,
        verbose_name=_("Status"),
        null=True,
        blank=True,
    )
    total_price = models.PositiveIntegerField(verbose_name=_("Total Price"))
    is_paid = models.BooleanField(default=False, verbose_name=_("Is Paid"))
    discount = models.PositiveIntegerField(default=0, verbose_name=_("Discount"))
    address = models.TextField(null=True, blank=True, verbose_name=_("Address"))
    phone = models.CharField(max_length=30, verbose_name=_("Phone"))
    transaction_code = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Transaction Code")
    )

    class OrderType(models.TextChoices):
        DELIVERY = "delivery", _("Delivery")
        TAKEAWAY = "takeaway", _("Takeaway")
        DINEIN = "dinein", _("Dinein")

    order_type = models.CharField(
        max_length=255,
        choices=OrderType.choices,
        default=OrderType.DINEIN,
        verbose_name=_("Order Type"),
    )

    def __str__(self) -> str:
        return f"{self.pk}-{self.user}'s Order"


class OrderItem(BaseModel):
    product = models.ForeignKey(
        Product,
        related_name="order_items",
        related_query_name="order_item",
        on_delete=models.CASCADE,
        verbose_name=_("Product"),
    )
    order = models.ForeignKey(
        Order,
        related_name="order_items",
        related_query_name="order_item",
        on_delete=models.CASCADE,
        verbose_name=_("Order"),
    )
    quantity = models.PositiveIntegerField(verbose_name=_("Quantity"))
    unit_price = models.PositiveIntegerField(verbose_name=_("Unit Price"))
    total_price = models.PositiveIntegerField(verbose_name=_("Total Price"))

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.pk}-{self.product}-{self.quantity}'s Order Item"


def generate_code():
    return uuid4().hex()[:8]


class Coupon(BaseModel):
    order = models.OneToOneField(
        Order,
        related_name="coupon",
        related_query_name="coupon",
        on_delete=models.CASCADE,
        verbose_name=_("Order"),
        null=True,
        blank=True,
    )

    discount = models.PositiveIntegerField(
        validators=[Min(5), Max(70)], verbose_name=_("Discount")
    )
    code = models.CharField(max_length=8, verbose_name=_("Code"), default=generate_code)
    expiration_date = models.DateTimeField(verbose_name=_("Expiration Date"))

    def __str__(self) -> str:
        return f"Coupon #{self.pk}-{self.code}-{self.discount}"


class Delivery(BaseModel):
    order = models.OneToOneField(
        Order,
        related_name="delivery",
        related_query_name="delivery",
        on_delete=models.CASCADE,
        verbose_name=_("Order"),
    )
    courier = models.ForeignKey(
        "accounts.User",
        related_name="deliveries",
        related_query_name="delivery",
        on_delete=models.CASCADE,
        verbose_name=_("Courier"),
    )
    is_delivered = models.BooleanField(default=False, verbose_name=_("Is Delivered"))
    arrival_time = models.DateTimeField(verbose_name=_("Arrival Time"))
    departure_time = models.DateTimeField(verbose_name=_("Departure Time"))

    def __str__(self) -> str:
        return f"Delivery #{self.pk}-{self.order}-{self.courier}"
