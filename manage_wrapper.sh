#!/usr/bin/env bash
# Small wrapper to run management commands with project path setup.
set -euo pipefail
PYTHON=${PYTHON:-python}
$PYTHON manage.py "$@"
