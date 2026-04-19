from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'items', views.MenuItemViewSet, basename='menuitem')
router.register(r'beverages', views.BeverageViewSet, basename='beverage')

urlpatterns = [
    path('', include(router.urls)),
]