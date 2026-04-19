from django.core.management.base import BaseCommand
from django.db import transaction
from apps.menu.models import MenuItem, Beverage


class Command(BaseCommand):
    help = 'Migrate existing menu data to translatable format'

    def handle(self, *args, **options):
        self.stdout.write('Starting menu translation migration...')
        
        with transaction.atomic():
            # Migrate MenuItems
            menu_items = MenuItem.objects.all()
            for item in menu_items:
                # Create Russian translation (default)
                if not item.translations.filter(language_code='ru').exists():
                    item.create_translation('ru', 
                        name=item.safe_translation_getter('name', any_language=True) or f'Item {item.pk}',
                        ingredients=item.safe_translation_getter('ingredients', any_language=True) or ''
                    )
                    self.stdout.write(f'Created Russian translation for MenuItem: {item.pk}')
            
            # Migrate Beverages
            beverages = Beverage.objects.all()
            for beverage in beverages:
                # Create Russian translation (default)
                if not beverage.translations.filter(language_code='ru').exists():
                    beverage.create_translation('ru',
                        name=beverage.safe_translation_getter('name', any_language=True) or f'Beverage {beverage.pk}',
                        description=beverage.safe_translation_getter('description', any_language=True) or ''
                    )
                    self.stdout.write(f'Created Russian translation for Beverage: {beverage.pk}')
        
        self.stdout.write(self.style.SUCCESS('Successfully migrated menu translations'))