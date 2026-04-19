from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'branches', views.BranchViewSet, basename='branch')
router.register(r'reviews', views.ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
]