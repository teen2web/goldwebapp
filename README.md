# GoldWeb

Production-ready full-stack web application scaffold using Django REST Framework, JWT authentication, React, Tailwind CSS, SQLite, and Azure Web App deployment conventions.

## Structure

- `backend/` Django project (`config`) and app (`api`)
- `frontend/` React + Vite + Tailwind SPA
- `requirements.txt`, `Procfile`, `runtime.txt` Azure deployment files

## Backend features

- Django + DRF API with `Post` model and custom `User`
- JWT auth using `djangorestframework-simplejwt`
- Refresh token rotation enabled
- Public read, authenticated create, owner-only update/delete
- WhiteNoise static serving and SQLite configuration

## Frontend features

- React Router pages for Home, Login, Register, Dashboard, Create/Edit Post
- Axios client with automatic token refresh interceptor
- Auth-aware navbar and protected routes
- Dark fintech theme using Tailwind CSS

## Local development

### 1. Backend

```bash
python3.14 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
cd backend
python manage.py migrate
python manage.py runserver
```

For Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item ..\.env.example ..\.env
cd backend
python manage.py migrate
python manage.py runserver
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The default frontend API target is `http://127.0.0.1:8000/api`.

## Production build flow

Build the React app and copy the generated static files into Django:

```bash
cd frontend
npm install
npm run build
```

Then collect static assets from the project root:

```bash
cd backend
python manage.py collectstatic --noinput
```

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/{id}`
- `PUT /api/posts/{id}`
- `DELETE /api/posts/{id}`

## Azure Web App environment variables

- `SECRET_KEY`
- `DEBUG=False`
- `ALLOWED_HOSTS=yourapp.azurewebsites.net`
- `CORS_ALLOWED_ORIGINS=https://yourapp.azurewebsites.net`
- `SECURE_SSL_REDIRECT=True`

## Azure deployment

```bash
az login
az group create --name myRG --location southeastasia
az appservice plan create --name myPlan --resource-group myRG --sku B1 --is-linux
az webapp create --resource-group myRG --plan myPlan --name myappname --runtime "PYTHON:3.14"
az webapp deploy --resource-group myRG --name myappname --src-path .
```

Set startup command if needed:

```bash
gunicorn backend.config.wsgi
```
