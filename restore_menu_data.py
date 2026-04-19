#!/usr/bin/env python
import os
import sys
import django
import json
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BonCafe.settings')
django.setup()

# Now we can import Django models
from apps.menu.models import MenuItem, Beverage, MenuItemTranslation, BeverageTranslation

def restore_data():
    """Restore menu data from JSON files and create translations"""
    
    # Restore MenuItems
    try:
        with open('menu_items_backup.json', 'r', encoding='utf-8') as f:
            menu_items_data = json.load(f)
        
        for item_data in menu_items_data:
            # Create or get the MenuItem
            menu_item, created = MenuItem.objects.get_or_create(
                id=item_data['id'],
                defaults={
                    'protein': item_data['protein'],
                    'carbs': item_data['carbs'],
                    'fats': item_data['fats'],
                    'price': Decimal(item_data['price']),
                    'photo': item_data['photo'],
                    'type': item_data['type'],
                }
            )
            
            # Create Russian translation (original data)
            MenuItemTranslation.objects.get_or_create(
                menu_item=menu_item,
                language='ru',
                defaults={
                    'name': item_data['name'],
                    'ingredients': item_data['ingredients'],
                }
            )
            
            print(f"Restored MenuItem: {item_data['name']} (ID: {item_data['id']})")
    
    except FileNotFoundError:
        print("menu_items_backup.json not found")
    
    # Restore Beverages
    try:
        with open('beverages_backup.json', 'r', encoding='utf-8') as f:
            beverages_data = json.load(f)
        
        for beverage_data in beverages_data:
            # Create or get the Beverage
            beverage, created = Beverage.objects.get_or_create(
                id=beverage_data['id'],
                defaults={
                    'price': Decimal(beverage_data['price']),
                    'photo': beverage_data['photo'],
                    'type': beverage_data['type'],
                }
            )
            
            # Create Russian translation (original data)
            BeverageTranslation.objects.get_or_create(
                beverage=beverage,
                language='ru',
                defaults={
                    'name': beverage_data['name'],
                    'description': beverage_data['description'],
                }
            )
            
            print(f"Restored Beverage: {beverage_data['name']} (ID: {beverage_data['id']})")
    
    except FileNotFoundError:
        print("beverages_backup.json not found")
    
    print("Data restoration completed!")
    print(f"Total MenuItems: {MenuItem.objects.count()}")
    print(f"Total Beverages: {Beverage.objects.count()}")
    print(f"Total MenuItem Translations: {MenuItemTranslation.objects.count()}")
    print(f"Total Beverage Translations: {BeverageTranslation.objects.count()}")

if __name__ == '__main__':
    restore_data()