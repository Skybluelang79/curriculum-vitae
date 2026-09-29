@echo off
echo ========================================
echo    Alex Portfolio - Quick Start
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

echo.
echo Starting server...
start "Alex Server" cmd /k "node server.js"

timeout /t 4 /nobreak >nul

echo.
echo Server should be running now!
echo.
echo Open in your browser:
echo   Main Portfolio: http://localhost:3000
echo   CV Page:        http://localhost:3000/cv.html
echo   Cover Letter:   http://localhost:3000/cover_letter.html
echo.
echo If it doesn't work, try opening index.html directly in your browser.
echo.
pause
