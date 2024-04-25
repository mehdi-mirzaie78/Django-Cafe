from django.db import transaction
from rest_framework import serializers
from core.validators import phone_regex_validator
from products.models import Product
from .models import Cart, CartItem, Order, OrderItem


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price"]


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "total_price"]

    def get_total_price(self, obj: CartItem):
        return obj.quantity * obj.product.price


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(read_only=True, many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price"]

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

    def save(self, **kwargs):
        with transaction.atomic():
            user_id = self.context["user_id"]
            cart_id = self.validated_data["cart_id"]

            order = Order(user_id=user_id)
            cart_items = CartItem.objects.select_related("product").filter(
                cart_id=cart_id
            )

            products_to_update = {}
            for item in cart_items:
                if item.quantity > item.product.stock:
                    raise serializers.ValidationError(
                        "Insufficient stock for one or more products"
                    )
                products_to_update[item.product.id] = item.product.stock - item.quantity

            Product.objects.bulk_update(
                [
                    Product(pk=product_id, stock=updated_stock)
                    for product_id, updated_stock in products_to_update.items()
                ],
                fields=["stock"],
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
            order.total_price = sum([item.total_price for item in cart_items])

            order.save()
            OrderItem.objects.bulk_create(order_items)
            Cart.objects.filter(pk=cart_id).delete()
            return order
