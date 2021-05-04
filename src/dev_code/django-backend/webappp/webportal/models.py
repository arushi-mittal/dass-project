from django.db import models
from django.contrib.auth.models import User
class Profile(models.Model):
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True, blank=True)
    mobile_number = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, blank=True)
    owner = models.ForeignKey(User, related_name="profile", on_delete=models.CASCADE, null=True)

