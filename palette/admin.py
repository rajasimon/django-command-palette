from django.contrib import admin


class PaletteAdminSite(admin.AdminSite):
    def each_context(self, request):
        context = super(PaletteAdminSite, self).each_context(request)

        palette = []
        available_apps = context["available_apps"]
        for available_app in available_apps:
            data = []
            for model in available_app["models"]:
                inner_data = {}
                inner_data["app_label"] = available_app["app_label"]
                inner_data["admin_url"] = model["admin_url"]
                inner_data["name"] = model["name"]
                inner_data["perms"] = model["perms"]
                data.append(inner_data)
            palette.append(data)

        context["palette"] = palette
        return context
