@echo off
echo ========================================
echo    Alex Portfolio - Quick Start
echo ========================================
echo.
echo Starting server...
cd /d "%USERPROFILE%\OneDrive\Desktop\HTML,CSS,JAVASCRIPT LEVEL 1&2\work\Alex Portfolio"

start "Alex Server" cmd /k "node server.js"

timeout /t 4 /nobreak >nul

echo.
echo Server should be running now!
echo.
echo Open in your browser:
echo   Main Portfolio: http://localhost:3000
echo   CV Page:        http://localhost:3000/cv.html
echo.
echo If it doesn't work, try opening index.html directly in your browser.
echo.
pause