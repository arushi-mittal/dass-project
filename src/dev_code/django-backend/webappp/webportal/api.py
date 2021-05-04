from .models import Profile
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer
from rest_framework.response import Response

class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    def get_queryset(self):
        return self.request.user.profile.all()

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

    def patch(self, request, *args, **kwargs):
        instance = self.queryset.get(owner=self.request.user)
        print(instance)
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)