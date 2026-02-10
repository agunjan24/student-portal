@echo off
setlocal

echo [Quiz Prep Bot] Starting dev server...

:: Check if port 3000 is already in use
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo [Quiz Prep Bot] Port 3000 is in use by PID %%a
    echo [Quiz Prep Bot] Run scripts\stop.cmd first, or use scripts\restart.cmd
    exit /b 1
)

:: Remove stale lock file if present
if exist "%~dp0..\.next\dev\lock" (
    del /f "%~dp0..\.next\dev\lock" 2>nul
    echo [Quiz Prep Bot] Removed stale lock file.
)

cd /d "%~dp0.."
start "QuizPrepBot" cmd /c "npm run dev"
echo [Quiz Prep Bot] Dev server starting on http://localhost:3000
