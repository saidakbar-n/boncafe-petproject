from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import MenuItem, Beverage
from .serializers import MenuItemSerializer, BeverageSerializer, MenuCategoriesSerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        lang = self.request.query_params.get('lang', 'ru')
        queryset = MenuItem.objects.prefetch_related('translations').all()
        
        item_type = self.request.query_params.get('type', None)
        if item_type:
            queryset = queryset.filter(type=item_type)
            
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(translations__name__icontains=search) | 
                Q(translations__ingredients__icontains=search)
            ).distinct()
        return queryset

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        item_type = request.query_params.get('type')
        if not item_type:
            return Response(
                {'error': 'Type parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        items = self.queryset.filter(type=item_type)
        if not items.exists():
            return Response(
                {'error': f'No items found for type: {item_type}'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(items, many=True)
        return Response({
            'type': item_type,
            'count': items.count(),
            'items': serializer.data
        })

    @action(detail=False, methods=['get'])
    def categories(self, request):
        lang = request.query_params.get('lang', 'ru')
        serializer = MenuCategoriesSerializer('menu', context={'lang': lang})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def grouped(self, request):
        lang = request.query_params.get('lang', 'ru')
        types = MenuItem.objects.values_list('type', flat=True).distinct()
        grouped_data = []
        for item_type in types:
            items = MenuItem.objects.filter(type=item_type)
            serializer = self.get_serializer(items, many=True)
            type_display = items.first().get_type_translated(lang) if items.exists() else item_type
            grouped_data.append({
                'type': item_type,
                'type_display': type_display,
                'count': items.count(),
                'items': serializer.data
            })
        return Response(grouped_data)


class BeverageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Beverage.objects.all()
    serializer_class = BeverageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        lang = self.request.query_params.get('lang', 'ru')
        queryset = Beverage.objects.prefetch_related('translations').all()
        
        item_type = self.request.query_params.get('type', None)
        if item_type:
            queryset = queryset.filter(type=item_type)
            
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(translations__name__icontains=search) | 
                Q(translations__description__icontains=search)
            ).distinct()
        return queryset

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        item_type = request.query_params.get('type')
        if not item_type:
            return Response(
                {'error': 'Type parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        items = self.queryset.filter(type=item_type)
        if not items.exists():
            return Response(
                {'error': f'No beverages found for type: {item_type}'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(items, many=True)
        return Response({
            'type': item_type,
            'count': items.count(),
            'items': serializer.data
        })

    @action(detail=False, methods=['get'])
    def categories(self, request):
        lang = request.query_params.get('lang', 'ru')
        serializer = MenuCategoriesSerializer('beverage', context={'lang': lang})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def grouped(self, request):
        lang = request.query_params.get('lang', 'ru')
        types = Beverage.objects.values_list('type', flat=True).distinct()
        grouped_data = []
        for item_type in types:
            items = Beverage.objects.filter(type=item_type)
            serializer = self.get_serializer(items, many=True)
            type_display = items.first().get_type_translated(lang) if items.exists() else item_type
            grouped_data.append({
                'type': item_type,
                'type_display': type_display,
                'count': items.count(),
                'items': serializer.data
            })
        return Response(grouped_data)