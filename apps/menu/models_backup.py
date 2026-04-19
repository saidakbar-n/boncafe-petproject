from django.db import models


class MenuItemTranslation(models.Model):
    """Translation model for MenuItem"""
    LANGUAGE_CHOICES = [
        ('ru', 'Russian'),
        ('en', 'English'),
        ('uz', 'Uzbek'),
    ]
    
    menu_item = models.ForeignKey('MenuItem', on_delete=models.CASCADE, related_name='translations')
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    name = models.CharField(max_length=150)
    ingredients = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('menu_item', 'language')
        
    def __str__(self):
        return f"{self.name} ({self.language})"


class BeverageTranslation(models.Model):
    """Translation model for Beverage"""
    LANGUAGE_CHOICES = [
        ('ru', 'Russian'),
        ('en', 'English'),
        ('uz', 'Uzbek'),
    ]
    
    beverage = models.ForeignKey('Beverage', on_delete=models.CASCADE, related_name='translations')
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('beverage', 'language')
        
    def __str__(self):
        return f"{self.name} ({self.language})"


class MenuItem(models.Model):
    TYPE_CHOICES = [
        ("new", "Новинки", "Yangiliklar"),
        ("breakfast", "Завтрак", "Nonushtalar"),
        ("omelette", "Омлеты", "Omletlar"),
        ("crepes_quiches", "Блины и киши", "Quymoqlar va kishlar"),
        ("sweet_crepes", "Сладкие блины", "Shirin quymoqlar"),
        ("soups", "Супы", "Sho'rvalar"),
        ("salads", "Салаты", "Salatlar"),
        ("sandwiches", "Сэндвичи и тосты", "Sendvichlar va tostlar"),
        ("main_courses", "Основные блюда", "Asosiy taomlar"),
        ("other", "Другое", "Boshqa"),
    ]

    # Non-translatable fields
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    photo = models.ImageField(upload_to="menu_photos/", null=True, blank=True)
    type = models.CharField(
        max_length=40,
        choices=[(c[0], c[1]) for c in TYPE_CHOICES],
        default="other"
    )

    def __str__(self):
        # Get name from Russian translation or first available translation
        translation = self.translations.filter(language='ru').first() or self.translations.first()
        return translation.name if translation else f'MenuItem {self.pk}'
    
    def get_translation(self, language='ru'):
        """Get translation for specific language with fallback"""
        translation = self.translations.filter(language=language).first()
        if not translation:
            # Fallback to Russian, then any available translation
            translation = self.translations.filter(language='ru').first() or self.translations.first()
        return translation

    def get_type_translated(self, lang="ru"):
        """Get translated type name based on language"""
        mapping = {c[0]: {"ru": c[1], "uz": c[2], "en": c[1]} for c in self.TYPE_CHOICES}
        return mapping.get(self.type, {}).get(lang, self.type)

    @classmethod
    def get_type_choices_translated(cls, lang="ru"):
        """Get all type choices translated for a given language"""
        if lang == "uz":
            return [(c[0], c[2]) for c in cls.TYPE_CHOICES]
        elif lang == "en":
            # For now, use Russian names for English until we add English translations
            return [(c[0], c[1]) for c in cls.TYPE_CHOICES]
        return [(c[0], c[1]) for c in cls.TYPE_CHOICES]

    class Meta:
        ordering = ['type']


class Beverage(models.Model):
    TYPE_CHOICES = [
        ("coffee", "Кофе", "Kofe"),
        ("new_drinks", "Новые напитки", "Yangi ichimliklar"),
        ("iced_coffee", "Холодный кофе", "Muzdek kofe"),
        ("cold_drinks", "Холодные напитки", "Sovuq ichimliklar"),
        ("decaf", "Без кофеина", "Kofeinsiz"),
        ("fresh_juices", "Свежие соки", "Yangi sharbatlar"),
        ("tea", "Чай", "Choy"),
        ("not_coffee", "Не кофе", "Kofe emas"),
    ]

    # Non-translatable fields
    price = models.DecimalField(max_digits=8, decimal_places=2)
    photo = models.ImageField(upload_to="beverage_photos/", null=True, blank=True)
    type = models.CharField(
        max_length=40,
        choices=[(c[0], c[1]) for c in TYPE_CHOICES],
        default="coffee"
    )

    def __str__(self):
        # Get name from Russian translation or first available translation
        translation = self.translations.filter(language='ru').first() or self.translations.first()
        return translation.name if translation else f'Beverage {self.pk}'
    
    def get_translation(self, language='ru'):
        """Get translation for specific language with fallback"""
        translation = self.translations.filter(language=language).first()
        if not translation:
            # Fallback to Russian, then any available translation
            translation = self.translations.filter(language='ru').first() or self.translations.first()
        return translation

    def get_type_translated(self, lang="ru"):
        """Get translated type name based on language"""
        mapping = {c[0]: {"ru": c[1], "uz": c[2], "en": c[1]} for c in self.TYPE_CHOICES}
        return mapping.get(self.type, {}).get(lang, self.type)

    @classmethod
    def get_type_choices_translated(cls, lang="ru"):
        """Get all type choices translated for a given language"""
        if lang == "uz":
            return [(c[0], c[2]) for c in cls.TYPE_CHOICES]
        elif lang == "en":
            # For now, use Russian names for English until we add English translations
            return [(c[0], c[1]) for c in cls.TYPE_CHOICES]
        return [(c[0], c[1]) for c in cls.TYPE_CHOICES]

    class Meta:
        ordering = ['type']