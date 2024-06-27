from core.serializers import BaseModelSerializer
from .models import Cafe, Contact


class CafeSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Cafe


class ContactSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Contact
        exclude = BaseModelSerializer.Meta.exclude + ["cafe"]
