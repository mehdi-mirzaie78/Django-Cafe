from drf_spectacular.contrib.rest_framework_simplejwt import SimpleJWTScheme


class SimpleJWTTokenUserScheme(SimpleJWTScheme):
    target_class = "accounts.auth.JWTAuthentication"
