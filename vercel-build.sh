#!/usr/bin/env bash
set -euo pipefail

echo "=== Vercel build: environment info ==="
echo "PWD: $(pwd)"
echo "Python: $(python --version 2>&1)"
echo "Which python: $(which python || echo 'which python: not found')"
echo "Node: $(node --version 2>&1 || echo 'node not found')"
echo "Npm: $(npm --version 2>&1 || echo 'npm not found')"

echo "=== Frontend build (if present) ==="
if [ -f frontend/package.json ]; then
  echo "Found frontend/package.json, building frontend..."
  pushd frontend >/dev/null
  echo "Node working dir: $(pwd)"
  npm ci || npm install
  npm run build
  popd >/dev/null
else
  echo "No frontend/package.json found, skipping frontend build"
fi

echo "=== Python environment & deps ==="
python -m pip --version || true
python -m pip freeze || true

echo "--- api/requirements.txt content ---"
if [ -f api/requirements.txt ]; then
  cat api/requirements.txt || echo "api/requirements.txt not readable"
else
  echo "api/requirements.txt not found"
fi

echo "=== Installing Python dependencies ==="
python -m pip install --upgrade pip
if [ -f api/requirements.txt ]; then
  python -m pip install -r api/requirements.txt
elif [ -f requirements.txt ]; then
  python -m pip install -r requirements.txt
else
  echo "No requirements.txt found; skipping pip install"
fi

echo "Pip after install:"
python -m pip freeze || true

echo "=== Running collectstatic ==="
python manage.py collectstatic --noinput || echo "collectstatic failed or no static files"

echo "=== Build script finished ==="
