from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path("auth/login/", views.LoginView.as_view(), name="login"),
    path("auth/refresh-token/", views.RefreshTokenView.as_view(), name="refresh"),
    path("profile/", views.ProfileView.as_view(), name="profile")
    # path("auth-logout/", views.LogoutView.as_view(), name="logout"),
]
