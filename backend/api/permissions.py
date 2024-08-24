from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

class IsEmailVerified(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            raise PermissionDenied("You need to be logged in to access this page.")
        
        if not request.user.is_verified:
            raise PermissionDenied("You need to verify your email to submit a tutoring request. Please verify your email through the link sent to you after you registered or contact us for support.")
        
        return True
