from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import LoginView, MeView, PostViewSet, RefreshView, RegisterView


router = DefaultRouter(trailing_slash=False)
router.register("posts", PostViewSet, basename="post")

urlpatterns = [
    path("auth/register", RegisterView.as_view(), name="register"),
    path("auth/login", LoginView.as_view(), name="login"),
    path("auth/refresh", RefreshView.as_view(), name="refresh"),
    path("auth/me", MeView.as_view(), name="me"),
    path("", include(router.urls)),
]
