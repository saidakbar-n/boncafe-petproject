#!/usr/bin/env bash
set -euo pipefail

echo "=== Vercel build: environment info ==="
echo "PWD: $(pwd)"
echo "Python: $(python --version 2>&1)"
echo "Which python: $(which python || echo 'which python: not found')"
echo "Pip before install:"
python -m pip --version || true
python -m pip freeze || true

echo "--- requirements.txt content ---"
cat requirements.txt || echo "requirements.txt not found"

echo "=== Installing Python dependencies ==="
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo "Pip after install:"
python -m pip freeze || true

echo "=== Running collectstatic ==="
python manage.py collectstatic --noinput

echo "=== Build script finished ==="
