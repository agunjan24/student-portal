@echo off
echo [Quiz Prep Bot] Restarting dev server...
call "%~dp0stop.cmd"
timeout /t 2 /nobreak >nul 2>&1
call "%~dp0start.cmd"
