from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.core.validators import MinValueValidator, MaxValueValidator

from uuid import uuid4

# Create your models here.

# Redefining UserManager To Implement Email Login & Verification
class UserManager(BaseUserManager):
    def create_user(self,username,email,password, **extra_fields):
        if not email:
            raise ValueError("Email Required!")
        if not username:
            raise ValueError("Username Required")
        
        user=self.model(username=username,email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username,email,password):
        if not email:
            raise ValueError("Email Required!")
        if not username:
            raise ValueError("Username Required!")
        if not password:
            raise ValueError("Password Required!")
        
        user=self.create_user(username=username,email=email,password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    grade_level = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(6),
            MaxValueValidator(12)
        ],
        default=12
    )
    school = models.TextField(blank=True, null=True)
    username = models.CharField(max_length=180, unique=True, db_index=True)
    email = models.EmailField(max_length=320, unique=True, db_index=True)
    created_at = models.DateField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = UserManager()

    def __str__(self):
        return self.email + f"({self.id})"
    
    def tokens(self):
        return ''