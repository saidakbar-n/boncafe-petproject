#!/usr/bin/env python
import os
import sys
import django
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BonCafe.settings')
django.setup()

# Now we can import Django models
from apps.menu.models import MenuItem, Beverage

def backup_data():
    """Backup existing menu data to JSON files"""
    
    # Backup MenuItems
    menu_items = []
    for item in MenuItem.objects.all():
        menu_items.append({
            'id': item.id,
            'name': item.name if hasattr(item, 'name') else '',
            'ingredients': item.ingredients if hasattr(item, 'ingredients') else '',
            'protein': float(item.protein),
            'carbs': float(item.carbs),
            'fats': float(item.fats),
            'price': str(item.price),
            'photo': item.photo.name if item.photo else '',
            'type': item.type,
        })
    
    with open('menu_items_backup.json', 'w', encoding='utf-8') as f:
        json.dump(menu_items, f, ensure_ascii=False, indent=2)
    
    # Backup Beverages
    beverages = []
    for beverage in Beverage.objects.all():
        beverages.append({
            'id': beverage.id,
            'name': beverage.name if hasattr(beverage, 'name') else '',
            'description': beverage.description if hasattr(beverage, 'description') else '',
            'price': str(beverage.price),
            'photo': beverage.photo.name if beverage.photo else '',
            'type': beverage.type,
        })
    
    with open('beverages_backup.json', 'w', encoding='utf-8') as f:
        json.dump(beverages, f, ensure_ascii=False, indent=2)
    
    print(f"Backed up {len(menu_items)} menu items and {len(beverages)} beverages")

if __name__ == '__main__':
    backup_data()