from uuid import uuid4
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator as Max, MinValueValidator as Min
from django.utils import timezone
from core.models import BaseModel
from core.validators import phone_regex_validator
from products.models import Product
from .utils import generate_code


class Table(BaseModel):
    class Meta:
        ordering = ["name"]
        verbose_name = _("Table")
        verbose_name_plural = _("Tables")

    name = models.CharField(max_length=255, verbose_name=_("Name"))
    capacity = models.PositiveIntegerField(verbose_name=_("Capacity"))
    is_available = models.BooleanField(default=True, verbose_name=_("Is Available"))

    def __str__(self) -> str:
        return f"{self.name}"


class Reservation(BaseModel):
    class Meta:
        ordering = ["reservation_datetime"]
        verbose_name = _("Reservation")
        verbose_name_plural = _("Reservations")

    user = models.ForeignKey(
        "accounts.User",
        related_name="reservations",
        related_query_name="reservation",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    table = models.ForeignKey(
        Table,
        related_name="reservations",
        related_query_name="reservation",
        on_delete=models.CASCADE,
        verbose_name=_("Table"),
    )

    reservation_datetime = models.DateTimeField(
        null=True, blank=True, verbose_name=_("Date Time Reservation")
    )

    def __str__(self):
        return f"Reservation #{self.pk} - {self.user} - {self.table}"


class Status(BaseModel):
    class Meta:
        ordering = ["id"]
        verbose_name = _("Status")
        verbose_name_plural = _("Statuses")

    name = models.CharField(max_length=255, verbose_name=_("Name"))
    description = models.TextField(null=True, blank=True, verbose_name=_("Description"))

    def __str__(self) -> str:
        return f"{self.name}"


class Cart(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid4)

    def check_and_remove_items(self):
        res = [
            item.remove_if_stock_is_less_than_quantity() for item in self.items.all()
        ]
        return sum(res)


class CartItem(BaseModel):
    cart = models.ForeignKey(
        Cart, verbose_name=_("Cart"), on_delete=models.CASCADE, related_name="items"
    )
    product = models.ForeignKey(
        Product,
        verbose_name=_("Product"),
        on_delete=models.CASCADE,
        related_name="items",
    )
    quantity = models.PositiveSmallIntegerField(
        verbose_name=_("Quantity"), default=1, validators=[Min(1)]
    )

    class Meta:
        unique_together = [["cart", "product"]]

    @property
    def total_price(self):
        return self.quantity * self.product.price

    def remove_if_stock_is_less_than_quantity(self):
        if self.product.stock < self.quantity:
            return self.delete()[0]

    def __str__(self):
        return f"{self.cart}-{self.product}-{self.quantity}"


class Order(BaseModel):
    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

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
    total_price = models.DecimalField(
        verbose_name=_("Total Price"),
        max_digits=5,
        decimal_places=2,
    )
    is_paid = models.BooleanField(default=False, verbose_name=_("Is Paid"))
    discount = models.PositiveIntegerField(default=0, verbose_name=_("Discount"))
    address = models.TextField(null=True, blank=True, verbose_name=_("Address"))
    phone = models.CharField(
        null=True,
        blank=True,
        max_length=13,
        verbose_name=_("Phone"),
        validators=[phone_regex_validator],
    )
    transaction_code = models.CharField(
        max_length=255, verbose_name=_("Transaction Code")
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

    def save(self, *args, **kwargs):
        if self.discount:
            self.total_price = (100 - self.discount) * self.total_price / 100
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.pk}-{self.user}'s Order"


class OrderItem(BaseModel):
    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")

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
    unit_price = models.DecimalField(
        verbose_name=_("Unit Price"), max_digits=5, decimal_places=2
    )
    total_price = models.DecimalField(
        verbose_name=_("Total Price"), max_digits=5, decimal_places=2
    )

    def __str__(self) -> str:
        return f"{self.pk}-{self.product}-{self.quantity}'s Order Item"


class Coupon(BaseModel):
    class Meta:
        verbose_name = _("Coupon")
        verbose_name_plural = _("Coupons")

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
    class Meta:
        verbose_name = _("Delivery")
        verbose_name_plural = _("Deliveries")

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
    is_delivered = models.BooleanField(
        default=False, verbose_name=_("Is Delivered"), help_text=_("Delivery status")
    )
    arrival_time = models.DateTimeField(
        null=True, verbose_name=_("Arrival Time"), help_text=_("Time of arrival")
    )
    departure_time = models.DateTimeField(
        null=True,
        verbose_name=_("Departure Time"),
        auto_now_add=True,
        help_text=_("Time of departure"),
    )

    def save(self, *args, **kwargs):
        if not self.arrival_time and self.is_delivered:
            self.arrival_time = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"Delivery #{self.pk}-{self.order}-{self.courier}"
