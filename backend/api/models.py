from django.db import models
from authentication.models import User
from multiselectfield import MultiSelectField

# Create your models here.

class NewsArticle(models.Model):
    title = models.CharField(max_length=300)
    img_link = models.TextField()
    article_link = models.TextField(default="https://www.nytimes.com/spotlight/learning-stem")
    excerpt = models.CharField(max_length=500)
    date_published = models.DateField()

class TutoringRequest(models.Model):
    COURSE_CHOICES = [
        ("ACT", "ACT"),
        ("SAT", "SAT"),
        ("NYC SHSAT", "NYC SHSAT"),
        ("Grade/Regents Level Sciences", "Grade/Regents Level Sciences"),
        ("Grade/Regents Level Math", "Grade/Regents Level Math"),
        ("Advanced Placement Biology", "Advanced Placement Biology"),
        ("Advanced Placement Chemistry", "Advanced Placement Chemistry"),
        ("Advanced Placement Physics 1", "Advanced Placement Physics 1"),
        ("Advanced Placement Statistics", "Advanced Placement Statistics"),
        ("Advanced Placement Calculus AB", "Advanced Placement Calculus AB"),
        ("Advanced Placement Calculus BC", "Advanced Placement Calculus BC"),
        ("Advanced Placement Computer Science A", "Advanced Placement Computer Science A"),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="requests")
    requested_at = models.DateTimeField(auto_now_add=True)
    selected_courses = MultiSelectField(choices=COURSE_CHOICES)
    additional_information = models.TextField(blank=True)
    request_approved = models.BooleanField(default=False)

class Resource(models.Model):
    CATEGORY_CHOICES = [
        ("nonprofits", "Non-Profits"),
        ("onlinecourses", "Online Courses"),
        ("studentorganizations", "Student Organizations")        
    ]

    name = models.CharField(max_length=150)
    profile_img_link = models.TextField(blank=True, null=True)
    description = models.TextField()
    link = models.TextField(blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=75)
    added_at = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=70, blank=True)
    state = models.CharField(max_length=2, blank=True)