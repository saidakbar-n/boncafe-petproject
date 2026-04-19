from django.db import models
from django.core.validators import RegexValidator


class Branch(models.Model):
    name = models.CharField(max_length=150)
    photos = models.ImageField(upload_to="branch_photos/", blank=True, null=True)
    google_maps_url = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True)

    def average_rating(self):
        qs = self.reviews.all()
        if not qs.exists():
            return 0
        return round(sum(r.stars for r in qs) / qs.count(), 1)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Branches"


class Review(models.Model):
    # Phone number validator (adjust regex pattern based on your needs)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )

    # Support both phone-based and web-based reviews
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=True,
        null=True,
        help_text="Customer's phone number (for phone-based reviews)"
    )
    customer_name = models.CharField(
        max_length=100,
        help_text="Customer name (required for web reviews)"
    )
    customer_email = models.EmailField(
        blank=True,
        null=True,
        help_text="Customer email (optional for web reviews)"
    )
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    stars = models.PositiveSmallIntegerField(
        default=1,
        choices=[(i, f"{i} Stars") for i in range(1, 6)],
        help_text="Rating from 1 to 5 stars"
    )
    message = models.TextField(
        help_text="Review message/feedback"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Track review source
    REVIEW_SOURCES = [
        ('web', 'Website Form'),
        ('phone', 'Phone Call'),
        ('admin', 'Admin Panel'),
    ]
    source = models.CharField(
        max_length=10,
        choices=REVIEW_SOURCES,
        default='web',
        help_text="How the review was submitted"
    )

    class Meta:
        ordering = ["-created_at"]

    def clean(self):
        from django.core.exceptions import ValidationError
        # Ensure either phone_number or customer_name is provided
        if not self.phone_number and not self.customer_name:
            raise ValidationError("Either phone number or customer name must be provided.")
        
        # Validate stars range
        if self.stars < 1 or self.stars > 5:
            raise ValidationError("Rating must be between 1 and 5 stars.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        name = self.customer_name or self.phone_number
        return f"{name} - {self.stars}★ at {self.branch.name}"
    
    @property
    def customer_display(self):
        """Return customer name if available, otherwise masked phone number"""
        if self.customer_name:
            return self.customer_name
        elif self.phone_number:
            # Mask phone number for privacy (show last 4 digits)
            phone = self.phone_number
            if len(phone) > 4:
                return f"***{phone[-4:]}"
            return "Anonymous"
        return "Anonymous"