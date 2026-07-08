@echo off
cd /d "%USERPROFILE%\OneDrive\Desktop\HTML,CSS,JAVASCRIPT LEVEL 1&2\work\Alex Portfolio"
start "Alex Portfolio" node server.js
timeout /t 3 /nobreak
echo Server should be running at http://localhost:8080
pause