from .models import NewsArticle, TutoringRequest, Resource
from rest_framework import serializers

class NewsArticleSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = ["title", "img_link","article_link","excerpt", "date_published", "formatted_date"]

    def get_formatted_date(self, obj):
        return obj.date_published.strftime("%b %d, %Y")

class TutoringRequestSerializer(serializers.ModelSerializer):
    selected_courses = serializers.ListField(
        child=serializers.ChoiceField(choices=TutoringRequest.COURSE_CHOICES)
    )

    def validate_selected_courses(self, value):
        if len(value) == 0:
            raise serializers.ValidationError("You need to select at least one subject.")
        return value

    class Meta:
        model = TutoringRequest
        fields = ["student", "requested_at", "selected_courses", "additional_information"]
        extra_kwargs = {
            "student": {"read_only": True},
            "additional_information" : {"required": False}
        }

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ["name", "profile_img_link", "description", "category", "added_at", "city", "state", "link"]
        extra_kwargs = {
            "profile_img_link" : {"required": False},
            "city" : {"required": False},
            "state" : {"required": False}
        }