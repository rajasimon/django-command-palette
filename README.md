# Palette

Palette is a Django app to add Command Palette to your Django admin.. This will make it
easy to navigate the Admin page with Ctrl/Cmd + K,

## Quick start

1. Add `"palette"` to your `INSTALLED_APPS` setting like this::

   ```
   INSTALLED_APPS = [
      ...
      'palette.apps.PaletteConfig',
      'palette.apps.PaletteAdminConfig',

      # django.contrib.admin # Remove this line from code
   ]
   ```

2. Start the development server and visit http://127.0.0.1:8000/admin/

3. Visit http://127.0.0.1:8000/admin and type `Ctrl/Cmd + K`
