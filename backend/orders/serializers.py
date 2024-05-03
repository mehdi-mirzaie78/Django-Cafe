from typing import List
from django.db import transaction
from rest_framework import serializers
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from core.validators import phone_regex_validator
from products.models import Product
from .models import Cart, CartItem, Order, OrderItem


class SimpleProductSerializer(serializers.ModelSerializer):
    medias = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "slug", "name", "price", "medias"]

    @extend_schema_field(List[OpenApiTypes.URI])
    def get_medias(self, obj: Product):
        return [media.file.url for media in obj.medias.all()]


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "total_price"]

    @extend_schema_field(OpenApiTypes.DECIMAL)
    def get_total_price(self, obj: CartItem):
        return obj.quantity * obj.product.price


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(read_only=True, many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price"]

    @extend_schema_field(OpenApiTypes.DECIMAL)
    def get_total_price(self, obj: Cart):
        return sum([item.product.price * item.quantity for item in obj.items.all()])


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = CartItem
        fields = ["id", "product_id", "quantity"]

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("No product with the given ID was found.")
        return value

    def validate(self, data):
        product = Product.objects.get(pk=data["product_id"])
        if product.stock < data["quantity"]:
            raise serializers.ValidationError(
                f"Product {product.name}'s stock: {product.stock} is less than {data['quantity']}"
            )
        return data

    def save(self, **kwargs):
        cart_id = self.context["cart_id"]
        product_id = self.validated_data["product_id"]
        quantity = self.validated_data["quantity"]

        queryset = CartItem.objects.filter(cart_id=cart_id, product_id=product_id)
        # if the cart item exists we update the quantity of it
        if queryset.exists():
            cart_item = queryset.get()
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        # if there is no cart item for an specific cart and specific product so we need to create it
        else:
            self.instance = CartItem.objects.create(
                cart_id=cart_id, **self.validated_data
            )

        return self.instance


class UpdateCartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ["quantity"]

    def validate(self, data):
        product = self.instance.product
        if product.stock < data["quantity"]:
            raise serializers.ValidationError(
                f"Quantity is more than {product.name}'s stock"
            )
        return data


class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "quantity", "unit_price", "total_price", "product"]


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(read_only=True, many=True)
    user = serializers.StringRelatedField()
    status = serializers.StringRelatedField()
    table = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "created_at",
            "status",
            "order_items",
            "discount",
            "total_price",
            "is_paid",
            "order_type",
            "table",
            "phone",
            "address",
            "transaction_code",
        ]


class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField(write_only=True)
    phone = serializers.CharField(
        max_length=13, validators=[phone_regex_validator], required=False
    )

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError("No cart with the given ID was found.")
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError("The cart is empty.")
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            user_id = self.context["user_id"]
            cart_id = self.validated_data["cart_id"]

            order = Order(user_id=user_id)
            cart_items = CartItem.objects.select_related("product").filter(
                cart_id=cart_id
            )

            order_items = [
                OrderItem(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    unit_price=item.product.price,
                    total_price=item.total_price,
                )
                for item in cart_items
            ]

            order.save()
            OrderItem.objects.bulk_create(order_items)
            Cart.objects.filter(pk=cart_id).delete()
            return order


class OrderPaymentSerializer(serializers.ModelSerializer):
    payment_status = serializers.BooleanField(write_only=True)

    class Meta:
        model = Order
        fields = ["id", "payment_status", "transaction_code"]

    def validate(self, data):
        if self.instance.is_paid:
            raise serializers.ValidationError("This order is already paid")
        return data

    def save(self, **kwargs):
        with transaction.atomic():
            order: Order = self.instance

            products_to_update = {}
            for item in order.order_items.all():
                if item.quantity > item.product.stock:
                    products_to_update[item.product.id] = {
                        "stock": 0,
                        "refill_quantity": item.quantity - item.product.stock,
                    }

                else:
                    products_to_update[item.product.id] = {
                        "stock": item.product.stock - item.quantity
                    }

            Product.objects.bulk_update(
                [
                    Product(pk=product_id, **data)
                    for product_id, data in products_to_update.items()
                ],
                fields=["stock", "refill_quantity"],
            )

            order.is_paid = True
            order.transaction_code = self.validated_data["transaction_code"]
            order.save()
            return order
