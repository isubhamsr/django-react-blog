from django.contrib import admin
from blog.models import Article, Comment

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    class Media:
        css = {
            "all": ("css/main.css",)
        }
        js = ("js/main.js",)

admin.site.register(Article, BlogAdmin)
admin.site.register(Comment)