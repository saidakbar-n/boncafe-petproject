from rest_framework import serializers
from .models import Branch, Review


class ReviewSerializer(serializers.ModelSerializer):
    customer_display = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = ['id', 'customer_display', 'phone_number', 'customer_name', 
                  'customer_email', 'stars', 'message', 'created_at', 'source']
        read_only_fields = ['id', 'created_at', 'customer_display']


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating reviews from web form"""

    class Meta:
        model = Review
        fields = ['customer_name', 'customer_email', 'branch', 'stars', 'message', 'source']

    def validate_stars(self, value):
        """Ensure stars are between 1 and 5"""
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5 stars.")
        return value

    def validate_customer_name(self, value):
        """Ensure customer name is provided for web reviews"""
        if not value or not value.strip():
            raise serializers.ValidationError("Customer name is required.")
        return value.strip()

    def validate(self, data):
        """Custom validation for web reviews"""
        customer_name = data.get('customer_name')
        customer_email = data.get('customer_email')
        branch = data.get('branch')

        # Check for duplicate reviews by name/email combination
        if customer_email:
            existing_review = Review.objects.filter(
                customer_name__iexact=customer_name,
                customer_email__iexact=customer_email,
                branch=branch
            ).exists()
            
            if existing_review:
                raise serializers.ValidationError(
                    "You have already submitted a review for this branch."
                )
        else:
            # If no email, check by name only (less strict)
            existing_review = Review.objects.filter(
                customer_name__iexact=customer_name,
                branch=branch,
                customer_email__isnull=True
            ).exists()
            
            if existing_review:
                raise serializers.ValidationError(
                    "A review with this name already exists for this branch. Please provide an email to distinguish your review."
                )

        return data

    def create(self, validated_data):
        # Set source to 'web' for reviews from the website
        validated_data['source'] = 'web'
        return super().create(validated_data)


class PhoneReviewCreateSerializer(serializers.ModelSerializer):
    """Separate serializer for phone-based reviews (admin use)"""

    class Meta:
        model = Review
        fields = ['phone_number', 'customer_name', 'branch', 'stars', 'message', 'source']

    def validate_phone_number(self, value):
        """Ensure phone number is provided for phone reviews"""
        if not value:
            raise serializers.ValidationError("Phone number is required for phone reviews.")
        return value

    def validate(self, data):
        """Check if phone user already reviewed this branch"""
        phone = data.get('phone_number')
        branch = data.get('branch')

        if Review.objects.filter(phone_number=phone, branch=branch).exists():
            raise serializers.ValidationError(
                "This phone number has already submitted a review for this branch."
            )
        return data

    def create(self, validated_data):
        # Set source to 'phone' for phone-based reviews
        validated_data['source'] = 'phone'
        return super().create(validated_data)


class BranchSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.SerializerMethodField()
    recent_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        fields = ['id', 'name', 'photos', 'google_maps_url', 'address',
                  'average_rating', 'review_count', 'recent_reviews']

    def get_review_count(self, obj):
        return obj.reviews.count()

    def get_recent_reviews(self, obj):
        """Get 3 most recent reviews for preview"""
        recent = obj.reviews.all()[:3]
        return ReviewSerializer(recent, many=True).data


class BranchDetailSerializer(BranchSerializer):
    """Extended serializer for branch detail view with all reviews"""
    all_reviews = ReviewSerializer(source='reviews', many=True, read_only=True)
    rating_breakdown = serializers.SerializerMethodField()

    class Meta(BranchSerializer.Meta):
        fields = BranchSerializer.Meta.fields + ['all_reviews', 'rating_breakdown']

    def get_rating_breakdown(self, obj):
        """Get count of reviews for each star rating"""
        reviews = obj.reviews.all()
        breakdown = {i: 0 for i in range(1, 6)}

        for review in reviews:
            if 1 <= review.stars <= 5:
                breakdown[review.stars] += 1

        return breakdown