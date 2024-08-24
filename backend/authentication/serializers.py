from .models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "grade_level", "school", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True},
            "school": {"required": False}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        try:
            validate_password(password=validated_data["password"], user=user)
        except ValidationError as error:
            user.delete()
            raise serializers.ValidationError({"password": error.messages})
        
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['grade_level'] = user.grade_level
        token['school'] = user.school
        token['username'] = user.username
        token['email'] = user.email
        token['is_verified'] = user.is_verified
        # ...

        return token