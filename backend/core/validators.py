from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

phone_regex = r"^(\+989|09)+\d{9}$"

phone_regex_validator = RegexValidator(
    regex=phone_regex,
    message=_(
        "Invalid Phone number. Phone number must be like: +989XXXXXXXXX or 09XXXXXXXXX"
    ),
)

name_regex = r"([a-zA-Z]+)"

name_regex_validator = RegexValidator(
    regex=name_regex,
    message=_("Invalid name. name must only contain alphabet letters."),
)
