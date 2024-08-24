from django.shortcuts import render
from django.urls import reverse
from .models import User
from .utils import send_activation_email

from rest_framework.generics import CreateAPIView
from .serializers import RegistrationSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings


# View Used To Register Users With Custom POST Method For Email Validation.
class RegistrationView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        user_info = request.data
        serializer = self.serializer_class(data=user_info)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = serializer.data

        curr_user = User.objects.get(email=user["email"])
        token = RefreshToken.for_user(curr_user).access_token

        curr_domain = get_current_site(request).domain
        redirected_link = reverse("email-verification")

        absolute_url="http://" + curr_domain + redirected_link + "?token=" + str(token)
        email_body = f"Hello {curr_user.first_name},\n\nThank you for joining STEMing Aspirations. Please use the following link to verify your email:\n{absolute_url}\n\nKind Regards,\nThe STEMing Aspirations Team"

        email_data = {"address": curr_user.email,"body":email_body, "subject": "Verify Your Email Address"} 

        send_activation_email(email_data)

        return Response(user, status=status.HTTP_201_CREATED)

class UserEmailVerficiationView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    def get(self, request):
        token = request.GET.get('token')
        try:
            algorithms = ["HS256"]

            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=algorithms)
            user=User.objects.get(id=payload["user_id"])

            if not user.is_verified:
                user.is_verified = True
                user.save()

                return render(request, "authentication/emailVerification.html",{
                              "message":"Successfully Verified Email. You can safely close this page and return to the website."
                            })
        except jwt.ExpiredSignatureError as error:
            return render(request, "authentication/emailVerification.html",{
                              "message":"Email Verification Failed.\nPlease send an email to steming.aspirations@gmail.com in order to verify your email."
                            })
        except jwt.exceptions.DecodeError as error:
            return render(request, "authentication/emailVerification.html",{ 
                              "message":"Email Verification Failed.\nPlease send an email to steming.aspirations@gmail.com in order to verify your email."
                            })
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer