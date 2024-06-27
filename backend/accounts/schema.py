from drf_spectacular.contrib.rest_framework_simplejwt import SimpleJWTScheme


class JWTAuthenticationScheme(SimpleJWTScheme):
    target_class = "accounts.auth.JWTAuthentication"
    name = "JWT Authentication"

    def get_security_definition(self, auto_schema):
        return {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "Value should be formatted: `Bearer <jwt token>`",
        }
