from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.utils.translation import gettext_lazy as _


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label=_("Password"), widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Confirm Password"), widget=forms.PasswordInput)

    class Meta:
        model = get_user_model()
        fields = ("email", "phone", "first_name", "last_name", "gender", "image")

    def clean_password2(self):
        cd = self.cleaned_data
        if cd["password1"] and cd["password2"] and cd["password1"] != cd["password2"]:
            raise ValidationError("Passwords don't match")
        return cd["password2"]

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        help_text='You can change password using <a href="../password/">this form</a>'
    )

    class Meta:
        model = get_user_model()
        fields = [
            "email",
            "phone",
            "first_name",
            "last_name",
            "gender",
            "password",
            "image",
            "last_login",
        ]
        labels = {
            "email": _("email"),
            "phone": _("phone number"),
            "first_name": _("first_name"),
            "last_name": _("last_name"),
            "gender": _("gender"),
            "password": _("password"),
            "image": _("image"),
            "last_login": _("last_login"),
        }
