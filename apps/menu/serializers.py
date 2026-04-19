from rest_framework import serializers
from .models import MenuItem, Beverage


class MenuItemSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    ingredients = serializers.SerializerMethodField()
    type_display = serializers.SerializerMethodField()
    calories = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'ingredients', 'protein', 'carbs', 'fats',
                  'price', 'photo', 'type', 'type_display', 'calories']

    def get_name(self, obj):
        """Get translated name based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'
        if request:
            lang = request.query_params.get('lang', 'ru')
        
        translation = obj.get_translation(lang)
        return translation.name if translation else f'MenuItem {obj.pk}'

    def get_ingredients(self, obj):
        """Get translated ingredients based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'
        if request:
            lang = request.query_params.get('lang', 'ru')
        
        translation = obj.get_translation(lang)
        return translation.ingredients if translation else ''

    def get_type_display(self, obj):
        """Get translated type based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'

        if request:
            lang = request.query_params.get('lang', 'ru')

        return obj.get_type_translated(lang)

    def get_calories(self, obj):
        """Calculate total calories"""
        return round((obj.protein * 4) + (obj.carbs * 4) + (obj.fats * 9), 1)


class BeverageSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    type_display = serializers.SerializerMethodField()

    class Meta:
        model = Beverage
        fields = ['id', 'name', 'description', 'price', 'photo', 'type', 'type_display']

    def get_name(self, obj):
        """Get translated name based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'
        if request:
            lang = request.query_params.get('lang', 'ru')
        
        translation = obj.get_translation(lang)
        return translation.name if translation else f'Beverage {obj.pk}'

    def get_description(self, obj):
        """Get translated description based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'
        if request:
            lang = request.query_params.get('lang', 'ru')
        
        translation = obj.get_translation(lang)
        return translation.description if translation else ''

    def get_type_display(self, obj):
        """Get translated type based on query parameter"""
        request = self.context.get('request')
        lang = 'ru'

        if request:
            lang = request.query_params.get('lang', 'ru')

        return obj.get_type_translated(lang)


class MenuCategoriesSerializer(serializers.Serializer):
    """Serializer to return available categories with translations"""
    categories = serializers.ListField()

    def to_representation(self, instance):
        lang = self.context.get('lang', 'ru')

        if instance == 'menu':
            choices = MenuItem.get_type_choices_translated(lang)
        else:
            choices = Beverage.get_type_choices_translated(lang)

        return {
            'categories': [
                {'key': choice[0], 'label': choice[1]}
                for choice in choices
            ]
        }