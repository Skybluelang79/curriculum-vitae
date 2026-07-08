@echo off
echo Starting Alex Portfolio Server...
cd /d "%USERPROFILE%\OneDrive\Desktop\HTML,CSS,JAVASCRIPT LEVEL 1&2\work\Alex Portfolio"
start cmd /k "node server.js"
echo.
echo If server started successfully, open:
echo http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul