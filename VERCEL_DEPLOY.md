Vercel deployment notes for BonCafe

1) Required Environment Variables (set these in Vercel dashboard → Settings → Environment Variables):

- DJANGO_SECRET_KEY: A strong random string (required in production)
- DJANGO_DEBUG: 0 for production, 1 for preview/dev (optional)
- DJANGO_ALLOWED_HOSTS: Comma-separated hosts (e.g. your-app.vercel.app,www.example.com)
- SITE_URL: https://<your-vercel-domain> (used to build absolute URLs)
- DATABASE_URL: (optional) Postgres URL if you want to use Postgres in production
- DJANGO_CSRF_TRUSTED_ORIGINS: (optional) comma-separated origins for CSRF (overrides SITE_URL)

2) Build Command (set in Vercel Build & Development Settings):

Use either the shell script we included, or inline commands:

- Inline command:
  python -m pip install --upgrade pip && python -m pip install -r requirements.txt && python manage.py collectstatic --noinput

- Or use the included script (make sure it is executable):
  ./vercel-build.sh

3) vercel.json routes all requests to `api/asgi.py` which exposes Django's ASGI app. We use WhiteNoise to serve static files from the `STATIC_ROOT` populated by `collectstatic`.

4) Local validation (before pushing):

```bash
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py collectstatic --noinput
python manage.py runserver
# or to test ASGI:
# uvicorn api.asgi:application --reload
```

5) Database recommendation:

- Development: SQLite (db.sqlite3) is fine locally.
- Production: use a managed Postgres and set DATABASE_URL in Vercel. Update settings.py to parse DATABASE_URL (we recommend `dj-database-url`).

6) Helpful extras added to the repo:
- `vercel-build.sh` - installs deps and runs `collectstatic`.
- `.vercelignore` - excludes local DB, media, and staticfiles.
- `vercel.json` - routes requests to `api/asgi.py` and sets DJANGO_SETTINGS_MODULE.

If you want, I can also:
- Update settings to parse `DATABASE_URL` automatically (add `dj-database-url`),
- Add a small `Procfile` or `manage_wrapper.sh` for alternative hosting.

