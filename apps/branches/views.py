from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Avg, Count
from .models import Branch, Review
from .serializers import (
    BranchSerializer,
    BranchDetailSerializer,
    ReviewSerializer,
    ReviewCreateSerializer
)


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BranchDetailSerializer
        return BranchSerializer

    def get_queryset(self):
        queryset = Branch.objects.all()
        ordering = self.request.query_params.get('ordering', None)

        if ordering == 'rating':
            queryset = queryset.annotate(
                avg_rating=Avg('reviews__stars')
            ).order_by('-avg_rating')
        elif ordering == 'reviews':
            queryset = queryset.annotate(
                review_count=Count('reviews')
            ).order_by('-review_count')

        return queryset

    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        branch = self.get_object()
        reviews = branch.reviews.all()

        stars = request.query_params.get('stars', None)
        if stars:
            try:
                stars = int(stars)
                if 1 <= stars <= 5:
                    reviews = reviews.filter(stars=stars)
            except ValueError:
                pass

        serializer = ReviewSerializer(reviews, many=True)
        return Response({
            'branch': branch.name,
            'total_reviews': reviews.count(),
            'average_rating': branch.average_rating(),
            'reviews': serializer.data
        })

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def submit_review(self, request, pk=None):
        """Submit a review for a specific branch"""
        branch = self.get_object()
        data = request.data.copy()
        data['branch'] = branch.id

        serializer = ReviewCreateSerializer(data=data)
        if serializer.is_valid():
            review = serializer.save()
            return Response({
                'success': True,
                'message': 'Thank you for your review!',
                'review': ReviewSerializer(review).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            'success': False,
            'message': 'Please check your input and try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':
            return ReviewCreateSerializer
        return ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()

        branch_id = self.request.query_params.get('branch', None)
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)

        phone = self.request.query_params.get('phone', None)
        if phone:
            queryset = queryset.filter(phone_number=phone)

        return queryset

    def create(self, request, *args, **kwargs):
        """Create a new review"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            review = serializer.save()
            return Response({
                'success': True,
                'message': 'Review submitted successfully!',
                'review': ReviewSerializer(review).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            'success': False,
            'message': 'Please check your input and try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def my_reviews(self, request):
        phone = request.query_params.get('phone', None)

        if not phone:
            return Response({
                'error': 'Phone number is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        reviews = Review.objects.filter(phone_number=phone)
        serializer = ReviewSerializer(reviews, many=True)

        return Response({
            'phone_number': phone,
            'total_reviews': reviews.count(),
            'reviews': serializer.data
        })