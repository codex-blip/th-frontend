@echo off
echo ========================================
echo Deploying Treasure Hunt Application
echo ========================================
echo.

echo Starting services with Docker Compose...
docker-compose up -d

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Application is running at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo To stop the application: docker-compose down
echo To view logs: docker-compose logs
echo.
pause
