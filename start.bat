@echo off
cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

start "Alex Portfolio" cmd /k "node server.js"
timeout /t 3 /nobreak >nul
echo Server should be running at http://localhost:3000
pause
