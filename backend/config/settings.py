import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Admin Panel Settings
SITE_HEADER = "Cuppa Cloud"
INDEX_TITLE = "Management Panel"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False if os.getenv("DEBUG") == "False" else True

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split()

# Application definition

LOCAL_APPS = ["core", "home", "accounts", "actions", "products", "orders"]
THIRD_PARTY_APPS = [
    "storages",
    "rest_framework",
    "corsheaders",
    "django_filters",
    "debug_toolbar",
    "drf_spectacular",
    "drf_spectacular_sidecar",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
INSTALLED_APPS += LOCAL_APPS
INSTALLED_APPS += THIRD_PARTY_APPS

MIDDLEWARE = [
    # corsheaders middleware
    "corsheaders.middleware.CorsMiddleware",
    # django debug toolbar
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    # django rest framework camel case
    "djangorestframework_camel_case.middleware.CamelCaseMiddleWare",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Tehran"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

MEDIA_URL = "/media/"
STATIC_URL = "/static/"
MEDIA_ROOT = BASE_DIR / "media"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# USER
AUTH_USER_MODEL = "accounts.User"

# AUTHENTICATION BACKENDS
AUTHENTICATION_BACKENDS = ["accounts.auth.PhoneEmailAuthBackend"]

# CORS SETTINGS
# CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS").split()
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split()

# JWT SETTINGS
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRATION_MINUTES = 60 * 60 * 2
REFRESH_TOKEN_EXPIRATION_MINUTES = 60 * 24 * 7

# JWT AUTHENTICATION SETTINGS
AUTH_HEADER_NAME = os.getenv("AUTH_HEADER_NAME")
AUTH_HEADER_TYPES = ("Bearer",)

# REST FRAMEWORK SETTINGS
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_RENDERER_CLASSES": (
        "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
        "djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer",
    ),
    "DEFAULT_PARSER_CLASSES": (
        "djangorestframework_camel_case.parser.CamelCaseMultiPartParser",
        "djangorestframework_camel_case.parser.CamelCaseJSONParser",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": ["accounts.auth.JWTAuthentication"],
}

# DJANGO DEBUG TOOLBAR
INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]

# Arvan cloud boto3 settings
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_S3_ENDPOINT_URL = os.getenv("AWS_S3_ENDPOINT_URL")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_SERVICE_NAME = os.getenv("AWS_SERVICE_NAME", "s3")
AWS_S3_FILE_OVERWRITE = False if os.getenv("AWS_S3_FILE_OVERWRITE") == "False" else True
AWS_LOCAL_STORAGE = BASE_DIR / os.getenv("AWS_LOCAL_STORAGE", "aws")

# REDIS SETTINGS
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": os.getenv("REDIS_DEFAULT_URL", "redis://localhost:6379/1"),
        "KEY_PREFIX": "cafe",
        "TIMEOUT": 60 * 15,  # in seconds: 15 minutes
    },
    "auth": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": os.getenv("REDIS_AUTH_URL", "redis://localhost:6379/2"),
        "KEY_PREFIX": "auth",
    },
}

# OTP SETTINGS
OTP_MAX_DIGIT = 6  # number of digits for an otp code
OTP_TIMEOUT = 60 * 2  # 2 minutes
VERIFICATION_KEY_PREFIX = "verification"
OTP_KEY_PREFIX = "otp"

# OTP SERVICE SETTINGS
OTP_API_KEY = os.getenv("OTP_API_KEY")
OTP_LINE_NUMBER = os.getenv("OTP_LINE_NUMBER")

# SUPERUSER SETTINGS
SUPERUSER_PHONE = str(os.getenv("SUPERUSER_PHONE"))
SUPERUSER_EMAIL = str(os.getenv("SUPERUSER_EMAIL"))
SUPERUSER_PASSWORD = str(os.getenv("SUPERUSER_PASSWORD"))
SUPERUSER_FIRST_NAME = str(os.getenv("SUPERUSER_FIRST_NAME"))
SUPERUSER_LAST_NAME = str(os.getenv("SUPERUSER_LAST_NAME"))


SPECTACULAR_SETTINGS = {
    "TITLE": "Cuppa Cloud API",
    "DESCRIPTION": "Beckend of an online cafe",
    "VERSION": "1.0.0",
    # "SERVE_INCLUDE_SCHEMA": False,
    "SERVE_INCLUDE_SCHEMA": True,
    # shorthand to use the sidecar instead
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
}
