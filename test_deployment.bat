@echo off
echo ========================================
echo Testing Treasure Hunt Application
echo ========================================
echo.

echo Testing Backend Health...
curl -s "http://localhost:8000/health" || echo "Backend not running on localhost:8000"

echo.
echo Testing Frontend...
echo Opening frontend in browser...
start http://localhost:3000

echo.
echo ========================================
echo Manual Test Steps:
echo ========================================
echo.
echo 1. Frontend should load at http://localhost:3000
echo 2. Try logging in with:
echo    Username: ismp@esportz
echo    Password: iitropargoat
echo    Team Captain Entry: 12345
echo.
echo 3. Try admin login:
echo    Username: max1112
echo    Password: moelester
echo    Team Captain Entry: admin123
echo.
echo 4. Check that admin panel shows logged users
echo.
echo ========================================
echo Production URLs (after deployment):
echo ========================================
echo.
echo Frontend: https://your-app.vercel.app
echo Backend: https://your-app.railway.app
echo API Docs: https://your-app.railway.app/docs
echo Health Check: https://your-app.railway.app/health
echo.
pause
