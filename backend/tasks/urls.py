from .views import TaskViewSet

from django.urls import include, path
from rest_framework import routers


router = routers.DefaultRouter()

router.register(r"tasks", TaskViewSet, basename="task")


urlPattern = [path("", include(router.urls))]
