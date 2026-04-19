from django.contrib import admin
from .models import Branch, Review


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'average_rating', 'review_count']
    search_fields = ['name', 'address']
    list_filter = ['name']

    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'address')
        }),
        ('Media & Links', {
            'fields': ('photos', 'google_maps_url')
        }),
    )

    def review_count(self, obj):
        return obj.reviews.count()

    review_count.short_description = 'Total Reviews'

    def average_rating(self, obj):
        return f"{obj.average_rating()}★"

    average_rating.short_description = 'Avg Rating'


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['customer_info', 'branch', 'stars', 'source', 'created_at', 'message_preview']
    list_filter = ['branch', 'stars', 'source', 'created_at']
    search_fields = ['phone_number', 'customer_name', 'customer_email', 'message']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email', 'phone_number')
        }),
        ('Review Details', {
            'fields': ('branch', 'stars', 'message', 'source')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def customer_info(self, obj):
        info_parts = []
        if obj.customer_name:
            info_parts.append(obj.customer_name)
        if obj.customer_email:
            info_parts.append(f"({obj.customer_email})")
        elif obj.phone_number:
            info_parts.append(f"({obj.phone_number})")
        
        return ' '.join(info_parts) if info_parts else 'Anonymous'

    customer_info.short_description = 'Customer'

    def message_preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message

    message_preview.short_description = 'Message Preview'