#!/usr/bin/env python3
import os
import sys

# Ensure project root is on sys.path so imports like `BonCafe` work
sys.path.append(os.getcwd())

# Use the project's settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BonCafe.settings")

# --- DEBUG HELPERS (REMOVE AFTER TROUBLESHOOTING) ---
try:
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('vercel-debug')
    logger.info('ASGI startup: Python %s', sys.version.replace('\n', ' '))
    logger.info('ASGI startup: sys.path=%s', sys.path)
    logger.info('ASGI startup: DJANGO_SETTINGS_MODULE=%s', os.environ.get('DJANGO_SETTINGS_MODULE'))
    try:
        import pkgutil
        installed = sorted([m.name for m in pkgutil.iter_modules()])
        logger.info('ASGI startup: installed packages (sample)=%s', installed[:30])
    except Exception as e:
        logger.info('ASGI startup: failed to list packages: %s', e)
except Exception:
    pass
# --- END DEBUG HELPERS ---

# Load .env variables if present (useful for local testing)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

from django.core.asgi import get_asgi_application

application = get_asgi_application()
