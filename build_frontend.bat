@echo off
echo ========================================
echo Building Frontend for Production
echo ========================================
echo.

cd frontend

echo Installing dependencies...
npm ci

echo Building application...
npm run build

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Build files are in the .next directory
echo To test production build: npm start
echo.
cd ..
pause
