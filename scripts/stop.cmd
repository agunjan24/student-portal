@echo off
setlocal

echo [Quiz Prep Bot] Stopping dev server...

set FOUND=0

:: Find processes listening on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    set FOUND=1
    echo [Quiz Prep Bot] Found server on PID %%a, sending graceful stop...
    taskkill /PID %%a /T >nul 2>&1

    :: Wait up to 5 seconds for graceful shutdown
    set STOPPED=0
    for /l %%i in (1,1,5) do (
        timeout /t 1 /nobreak >nul 2>&1
        netstat -aon | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
        if errorlevel 1 (
            set STOPPED=1
            goto :check_stopped
        )
    )

    :check_stopped
    if "!STOPPED!"=="0" (
        echo [Quiz Prep Bot] Graceful stop timed out. Force killing PID %%a...
        taskkill /PID %%a /F /T >nul 2>&1
        timeout /t 1 /nobreak >nul 2>&1
    )
)

:: Also kill any node processes running next dev
for /f "tokens=2" %%a in ('wmic process where "commandline like '%%next dev%%'" get processid /value 2^>nul ^| findstr "="') do (
    echo [Quiz Prep Bot] Found next dev process PID %%a, killing...
    taskkill /PID %%a /F /T >nul 2>&1
    set FOUND=1
)

:: Remove lock file
if exist "%~dp0..\.next\dev\lock" (
    del /f "%~dp0..\.next\dev\lock" 2>nul
    echo [Quiz Prep Bot] Removed lock file.
)

if "%FOUND%"=="0" (
    echo [Quiz Prep Bot] No running server found.
) else (
    echo [Quiz Prep Bot] Server stopped.
)

endlocal
