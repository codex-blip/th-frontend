@echo off
echo ========================================
echo Treasure Hunt - Quick Deploy
echo ========================================
echo.
echo Choose deployment method:
echo 1. Docker (Local/Server)
echo 2. Production Build (Manual)
echo 3. Development Mode
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Docker deployment...
    call build_docker.bat
    call deploy_docker.bat
) else if "%choice%"=="2" (
    echo.
    echo Building for production...
    call build_frontend.bat
    echo.
    echo Production build complete!
    echo.
    echo Next steps:
    echo 1. Deploy backend to Railway/Render
    echo 2. Deploy frontend to Vercel
    echo 3. Update environment variables
    echo.
    echo See DEPLOYMENT.md for detailed instructions
) else if "%choice%"=="3" (
    echo.
    echo Starting development servers...
    start cmd /k "cd backend && .venv\Scripts\activate && uvicorn main:app --reload"
    start cmd /k "cd frontend && npm run dev"
    echo.
    echo Development servers starting...
    echo Frontend: http://localhost:3000
    echo Backend: http://localhost:8000
) else (
    echo Invalid choice. Please run the script again.
)

echo.
pause
