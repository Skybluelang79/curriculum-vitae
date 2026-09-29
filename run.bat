@echo off
echo Starting Alex Portfolio Server...
cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

start "Alex Server" cmd /k "node server.js"
echo.
echo If server started successfully, open:
echo   http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
