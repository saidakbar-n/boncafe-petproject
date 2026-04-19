#!/usr/bin/env python3
import os
import sys

# Ensure project root is on sys.path so imports like `BonCafe` work
sys.path.append(os.getcwd())

# Use the project's settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BonCafe.settings")

# Load .env variables if present (useful for local testing)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

from django.core.asgi import get_asgi_application

application = get_asgi_application()
