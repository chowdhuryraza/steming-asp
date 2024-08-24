from django.shortcuts import render
from .models import NewsArticle, TutoringRequest, Resource
from .serializers import NewsArticleSerializer, TutoringRequestSerializer, ResourceSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from .permissions import IsEmailVerified

class NewsArticleView(generics.ListAPIView):
    serializer_class = NewsArticleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        recent_articles = NewsArticle.objects.order_by("-date_published")[:3]

        return recent_articles

class TutoringRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = TutoringRequestSerializer
    permission_classes = [IsAuthenticated, IsEmailVerified]

    def get_queryset(self):
        user = self.request.user
        return TutoringRequest.objects.filter(student=user)
    
    def list(self, request):
        queryset = self.get_queryset()
        if queryset.exists():
            latest_request = queryset.order_by("-requested_at").first()
            if not latest_request.request_approved:
                return Response({"detail": "Your latest tutoring request is still active. Please continue to lookout for an email from us about your active request."}, 
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return super().list(request)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(student=self.request.user)

class ResourceView(generics.ListAPIView):
    serializer_class = ResourceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Resource.objects.all()
        selected_category = self.request.query_params.get('category')

        if selected_category is not None:
            queryset = queryset.filter(category=selected_category)

        return queryset