@echo off
echo ========================================
echo Treasure Hunt Login System Setup
echo ========================================
echo.

echo Setting up Backend...
cd backend
echo Creating virtual environment...
python -m venv .venv
echo Activating virtual environment...
call .venv\Scripts\activate
echo Installing Python dependencies...
pip install -r requirements.txt
cd ..

echo.
echo Setting up Frontend...
cd frontend
echo Installing Node.js dependencies...
npm install
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the backend server, run: start_backend.bat
echo To start the frontend server, run: start_frontend.bat
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:3000
echo.
echo Default credentials:
echo Normal User: ismp@esportz / iitropargoat
echo Admin: max1112 / moelester
echo.
pause 