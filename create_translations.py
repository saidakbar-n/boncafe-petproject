#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BonCafe.settings')
django.setup()

# Now we can import Django models
from apps.menu.models import MenuItem, Beverage, MenuItemTranslation, BeverageTranslation

def create_sample_translations():
    """Create sample English and Uzbek translations"""
    
    # Sample translations for MenuItems
    menu_translations = {
        1: {  # Классический завтрак
            'en': {'name': 'Classic Breakfast', 'ingredients': 'Eggs, bacon, toast, butter, jam'},
            'uz': {'name': 'Klassik nonushta', 'ingredients': 'Tuxum, bekon, tost, sariyog\', murabbo'}
        },
        2: {  # Омлет с сыром
            'en': {'name': 'Cheese Omelette', 'ingredients': 'Eggs, cheese, herbs, butter'},
            'uz': {'name': 'Pishloqli omlet', 'ingredients': 'Tuxum, pishloq, ko\'katlar, sariyog\''}
        },
        3: {  # Блины с медом
            'en': {'name': 'Pancakes with Honey', 'ingredients': 'Flour, eggs, milk, honey, butter'},
            'uz': {'name': 'Asalli quymoq', 'ingredients': 'Un, tuxum, sut, asal, sariyog\''}
        },
        4: {  # Борщ украинский
            'en': {'name': 'Ukrainian Borscht', 'ingredients': 'Beets, cabbage, carrots, beef, sour cream'},
            'uz': {'name': 'Ukraina borshi', 'ingredients': 'Lavlagi, karam, sabzi, mol go\'shti, smetana'}
        },
        5: {  # Цезарь с курицей
            'en': {'name': 'Caesar Salad with Chicken', 'ingredients': 'Lettuce, chicken, parmesan, croutons, caesar dressing'},
            'uz': {'name': 'Tovuqli Sezar salati', 'ingredients': 'Salat bargi, tovuq, parmesan, kruton, sezar sousi'}
        }
    }
    
    # Sample translations for Beverages
    beverage_translations = {
        1: {  # Эспрессо
            'en': {'name': 'Espresso', 'description': 'Strong Italian coffee'},
            'uz': {'name': 'Espresso', 'description': 'Kuchli italyan qahvasi'}
        },
        2: {  # Капучино
            'en': {'name': 'Cappuccino', 'description': 'Espresso with steamed milk and foam'},
            'uz': {'name': 'Kapuchino', 'description': 'Bug\'da pishirilgan sut va ko\'pikli espresso'}
        },
        3: {  # Латте
            'en': {'name': 'Latte', 'description': 'Espresso with steamed milk'},
            'uz': {'name': 'Latte', 'description': 'Bug\'da pishirilgan sutli espresso'}
        },
        4: {  # Фраппе
            'en': {'name': 'Frappe', 'description': 'Iced coffee drink'},
            'uz': {'name': 'Frappe', 'description': 'Muzli qahva ichimlik'}
        },
        5: {  # Зеленый чай
            'en': {'name': 'Green Tea', 'description': 'Traditional green tea'},
            'uz': {'name': 'Yashil choy', 'description': 'An\'anaviy yashil choy'}
        },
        6: {  # Апельсиновый сок
            'en': {'name': 'Orange Juice', 'description': 'Fresh orange juice'},
            'uz': {'name': 'Apelsin sharbati', 'description': 'Yangi apelsin sharbati'}
        }
    }
    
    # Create MenuItem translations
    for item_id, translations in menu_translations.items():
        try:
            menu_item = MenuItem.objects.get(id=item_id)
            
            # Create English translation
            MenuItemTranslation.objects.get_or_create(
                menu_item=menu_item,
                language='en',
                defaults=translations['en']
            )
            
            # Create Uzbek translation
            MenuItemTranslation.objects.get_or_create(
                menu_item=menu_item,
                language='uz',
                defaults=translations['uz']
            )
            
            print(f"Created translations for MenuItem: {menu_item}")
            
        except MenuItem.DoesNotExist:
            print(f"MenuItem with ID {item_id} not found")
    
    # Create Beverage translations
    for beverage_id, translations in beverage_translations.items():
        try:
            beverage = Beverage.objects.get(id=beverage_id)
            
            # Create English translation
            BeverageTranslation.objects.get_or_create(
                beverage=beverage,
                language='en',
                defaults=translations['en']
            )
            
            # Create Uzbek translation
            BeverageTranslation.objects.get_or_create(
                beverage=beverage,
                language='uz',
                defaults=translations['uz']
            )
            
            print(f"Created translations for Beverage: {beverage}")
            
        except Beverage.DoesNotExist:
            print(f"Beverage with ID {beverage_id} not found")
    
    print("\nTranslation creation completed!")
    print(f"Total MenuItem Translations: {MenuItemTranslation.objects.count()}")
    print(f"Total Beverage Translations: {BeverageTranslation.objects.count()}")
    
    # Show translation counts by language
    for lang in ['ru', 'en', 'uz']:
        menu_count = MenuItemTranslation.objects.filter(language=lang).count()
        beverage_count = BeverageTranslation.objects.filter(language=lang).count()
        print(f"{lang.upper()}: {menu_count} menu items, {beverage_count} beverages")

if __name__ == '__main__':
    create_sample_translations()