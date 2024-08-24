from django.urls import path
from .views import NewsArticleView, TutoringRequestListCreateView, ResourceView

urlpatterns = [
    path("recent-news/", NewsArticleView.as_view(), name="recent-news"),
    path("tutoring/request/", TutoringRequestListCreateView.as_view(), name="tutoring-request"),
    path("resources/", ResourceView.as_view(), name="resources")
]