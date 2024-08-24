from django.urls import path, include
from authentication.views import RegistrationView, UserEmailVerficiationView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("email-verification/", UserEmailVerficiationView.as_view(), name="email-verification"),
    path("token/", MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls"))
]