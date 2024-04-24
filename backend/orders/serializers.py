from products.models import Product
from rest_framework import serializers
from .models import Cart, CartItem


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
