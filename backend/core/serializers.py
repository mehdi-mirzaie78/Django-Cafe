from rest_framework import serializers


class BaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = [
            "created_at",
            "deleted_at",
            "restored_at",
            "updated_at",
            "is_deleted",
            "is_active",
            "created_by",
            "updated_by",
        ]
