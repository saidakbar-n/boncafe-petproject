#!/usr/bin/env bash
set -euo pipefail

# Install Python dependencies
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Run Django collectstatic to populate STATIC_ROOT
python manage.py collectstatic --noinput
