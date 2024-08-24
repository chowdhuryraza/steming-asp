from django.contrib import admin
from .models import NewsArticle, TutoringRequest, Resource
# Register your models here.
admin.site.register(NewsArticle)
admin.site.register(TutoringRequest)
admin.site.register(Resource)