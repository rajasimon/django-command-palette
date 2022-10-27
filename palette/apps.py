from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class PaletteConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "palette"


class PaletteAdminConfig(AdminConfig):
    default_site = "palette.admin.PaletteAdminSite"
