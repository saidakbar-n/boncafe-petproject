from django.contrib import admin
from .models import MenuItem, Beverage, MenuItemTranslation, BeverageTranslation


class MenuItemTranslationInline(admin.TabularInline):
    model = MenuItemTranslation
    extra = 0
    fields = ['language', 'name', 'ingredients']


class BeverageTranslationInline(admin.TabularInline):
    model = BeverageTranslation
    extra = 0
    fields = ['language', 'name', 'description']


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['get_name', 'type', 'price', 'protein', 'carbs', 'fats', 'has_photo', 'get_languages']
    list_filter = ['type']
    search_fields = ['translations__name', 'translations__ingredients']
    list_editable = ['price']
    inlines = [MenuItemTranslationInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('type', 'price', 'photo')
        }),
        ('Nutrition', {
            'fields': ('protein', 'carbs', 'fats')
        }),
    )

    def get_name(self, obj):
        return str(obj)
    get_name.short_description = 'Name'

    def has_photo(self, obj):
        return bool(obj.photo)
    has_photo.boolean = True
    has_photo.short_description = 'Photo'

    def get_languages(self, obj):
        """Show available languages for this item"""
        return ', '.join([t.language for t in obj.translations.all()])
    get_languages.short_description = 'Languages'


@admin.register(Beverage)
class BeverageAdmin(admin.ModelAdmin):
    list_display = ['get_name', 'type', 'price', 'has_photo', 'get_languages']
    list_filter = ['type']
    search_fields = ['translations__name', 'translations__description']
    list_editable = ['price']
    inlines = [BeverageTranslationInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('type', 'price', 'photo')
        }),
    )

    def get_name(self, obj):
        return str(obj)
    get_name.short_description = 'Name'

    def has_photo(self, obj):
        return bool(obj.photo)
    has_photo.boolean = True
    has_photo.short_description = 'Photo'

    def get_languages(self, obj):
        """Show available languages for this item"""
        return ', '.join([t.language for t in obj.translations.all()])
    get_languages.short_description = 'Languages'


# Register translation models for direct editing if needed
@admin.register(MenuItemTranslation)
class MenuItemTranslationAdmin(admin.ModelAdmin):
    list_display = ['menu_item', 'language', 'name']
    list_filter = ['language']
    search_fields = ['name', 'ingredients']


@admin.register(BeverageTranslation)
class BeverageTranslationAdmin(admin.ModelAdmin):
    list_display = ['beverage', 'language', 'name']
    list_filter = ['language']
    search_fields = ['name', 'description']