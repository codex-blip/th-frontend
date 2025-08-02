# Treasure Hunt Login System

A treasure hunt event login system with Next.js frontend and FastAPI backend.

## Features

- **Login Page**: Single page application for treasure hunt participants
- **Admin Panel**: View all registered users and their timings
- **Authentication**: Username/password + team captain entry number validation
- **Winner Declaration**: Admin can assess timings to declare winners

## Project Structure

```
th/
├── frontend/          # Next.js React application
├── backend/           # FastAPI Python backend
├── README.md         # This file
└── .gitignore        # Git ignore file
```

## Setup Instructions

### Backend Setup
1. Navigate to `backend/` directory
2. Create virtual environment: `python -m venv .venv`
3. Activate virtual environment:
   - Windows: `.venv\Scripts\activate`
   - Linux/Mac: `source .venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn main:app --reload`

### Frontend Setup
1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Default Credentials

### Normal User
- Username: `ismp@esportz`
- Password: `iitropargoat`

### Admin
- Username: `max1112`
- Password: `moelester`

## Quick Deployment

### Option 1: Docker (Recommended)
```bash
# Quick deploy with Docker
.\quick_deploy.bat
```

### Option 2: Cloud Deployment (Free)
1. **Frontend**: Deploy to [Vercel](https://vercel.com)
2. **Backend**: Deploy to [Railway](https://railway.app)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## API Endpoints

- `POST /api/login` - User login
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/declare-winner` - Declare winner (admin only) 