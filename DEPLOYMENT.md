# Deployment Guide - Treasure Hunt Login System

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker and Docker Compose installed

#### Steps
1. **Build the application**:
   ```bash
   ./build_docker.bat
   ```

2. **Deploy with Docker Compose**:
   ```bash
   ./deploy_docker.bat
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

---

### Option 2: Cloud Deployment (Free)

#### Frontend on Vercel
1. Create account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Deploy from the `frontend` directory
4. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`

#### Backend on Railway
1. Create account on [Railway](https://railway.app)
2. Create new project from GitHub repository
3. Deploy from the `backend` directory
4. Railway will automatically detect and deploy the FastAPI app

---

### Option 3: VPS Deployment

#### Prerequisites
- Ubuntu/Debian VPS
- SSH access
- Domain name (optional)

#### Setup Script for Ubuntu/Debian:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python, Node.js, and Nginx
sudo apt install python3 python3-pip python3-venv nodejs npm nginx -y

# Install PM2 for process management
sudo npm install -g pm2

# Clone your repository
git clone <your-repo-url>
cd treasure-hunt

# Setup Backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Setup Frontend
cd ../frontend
npm install
npm run build

# Configure Nginx (see nginx.conf example below)
```

---

### Option 4: Production on Same Server

#### Prerequisites
- Windows Server or Linux VPS
- Python 3.8+
- Node.js 18+

#### Steps
1. **Build frontend for production**:
   ```bash
   ./build_frontend.bat
   ```

2. **Setup environment variables**:
   - Copy `.env.example` files and configure them

3. **Run in production mode**:
   ```bash
   # Backend (in production mode)
   cd backend
   .venv\Scripts\activate
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

   # Frontend (in production mode)
   cd frontend
   npm start
   ```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
SECRET_KEY=your-super-secret-key-change-this
DATABASE_URL=sqlite:///./treasure_hunt.db
CORS_ORIGINS=["https://your-frontend-domain.com"]
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Nginx Configuration (nginx.conf)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Security Considerations

1. **Change default credentials** in production
2. **Use HTTPS** in production (Let's Encrypt for free SSL)
3. **Set strong SECRET_KEY** for JWT tokens
4. **Configure CORS** properly for your domain
5. **Use environment variables** for sensitive data
6. **Regular backups** of SQLite database

---

## 📊 Monitoring

### Docker Logs
```bash
docker-compose logs -f
```

### PM2 Monitoring (if using PM2)
```bash
pm2 status
pm2 logs
pm2 monit
```

---

## 🚨 Troubleshooting

### Common Issues

1. **CORS Error**: Update CORS_ORIGINS in backend .env
2. **Database not found**: Ensure proper file permissions
3. **Port conflicts**: Check if ports 3000/8000 are available
4. **Build failures**: Ensure all dependencies are installed

### Health Checks
- Backend: http://your-domain.com:8000/docs
- Frontend: http://your-domain.com:3000

---

## 📈 Scaling

For high traffic:
1. Use multiple backend workers: `--workers 4`
2. Implement Redis for session storage
3. Use PostgreSQL instead of SQLite
4. Load balancer for multiple instances
5. CDN for static assets

---

**Need help?** Check the logs and ensure all environment variables are set correctly.
