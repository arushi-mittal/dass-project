from rest_framework import routers, urlpatterns
from .api import ProfileViewSet

router = routers.DefaultRouter()
router.register('api/profile', ProfileViewSet, 'profile')

urlpatterns = router.urls