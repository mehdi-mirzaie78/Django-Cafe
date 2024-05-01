from rest_framework import status
from rest_framework.exceptions import APIException
from django.utils.translation import gettext_lazy as _


class OrderNotFoundException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = _("Order not found")
    default_code = "order_not_found"


class OrderChangedException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = _("Some items price has been changed. Please refresh the page")
    default_code = "order_changed"


class OrderItemRemovedException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = _(
        "One or more items are not available in the requested quantity so they are removed from your order."
    )
    default_code = "order_item_removed"
