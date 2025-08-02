@echo off
echo ========================================
echo Building Treasure Hunt Application
echo ========================================
echo.

echo Building backend Docker image...
cd backend
docker build -t treasure-hunt-backend .
cd ..

echo.
echo Building frontend Docker image...
cd frontend
docker build -t treasure-hunt-frontend .
cd ..

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo To run with Docker Compose: docker-compose up
echo To run backend only: docker run -p 8000:8000 treasure-hunt-backend
echo To run frontend only: docker run -p 3000:3000 treasure-hunt-frontend
echo.
pause
