@echo off
echo ========================================
echo GitHub Repository Setup
echo ========================================
echo.
echo STEP 1: Create GitHub Repository
echo ---------------------------------
echo 1. Go to https://github.com
echo 2. Click "New repository"
echo 3. Name: treasure-hunt-login-system
echo 4. Description: Treasure Hunt Login System for 500+ freshers
echo 5. Make it PUBLIC
echo 6. DON'T initialize with README
echo 7. Click "Create repository"
echo.
echo STEP 2: Get Your Repository URL
echo -------------------------------
echo After creating, GitHub will show you a URL like:
echo https://github.com/YOUR_USERNAME/treasure-hunt-login-system.git
echo.
echo STEP 3: Run These Commands
echo -------------------------
echo Copy your repository URL and run:
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/treasure-hunt-login-system.git
echo git push -u origin main
echo.
echo ========================================
echo Current Git Status:
echo ========================================
git status
echo.
echo Files are ready to push!
echo.
pause
