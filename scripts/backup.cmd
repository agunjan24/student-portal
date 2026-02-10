@echo off
setlocal enabledelayedexpansion

set PROJECT_DIR=%~dp0..
set BACKUP_DIR=%PROJECT_DIR%\backups

:: Create timestamp (YYYYMMDD_HHMMSS)
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set DT=%%a
set TIMESTAMP=%DT:~0,4%%DT:~4,2%%DT:~6,2%_%DT:~8,2%%DT:~10,2%%DT:~12,2%
set ZIP_NAME=quiz-prep-backup_%TIMESTAMP%.zip

echo [Backup] Starting backup...

:: Create backups folder if needed
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Check that there's something to back up
set HAS_DATA=0
if exist "%PROJECT_DIR%\prisma\dev.db" set HAS_DATA=1
if exist "%PROJECT_DIR%\public\uploads" (
    dir /b "%PROJECT_DIR%\public\uploads" 2>nul | findstr /v ".gitkeep" >nul 2>&1 && set HAS_DATA=1
)

if "%HAS_DATA%"=="0" (
    echo [Backup] Nothing to back up — no database or uploads found.
    exit /b 0
)

:: Build zip using PowerShell (available on all modern Windows)
echo [Backup] Creating %ZIP_NAME%...

powershell -NoProfile -Command ^
    "$tempDir = Join-Path $env:TEMP ('quiz-prep-backup-' + [guid]::NewGuid().ToString('N'));" ^
    "New-Item -ItemType Directory -Path $tempDir | Out-Null;" ^
    "$projectDir = '%PROJECT_DIR%';" ^
    "if (Test-Path (Join-Path $projectDir 'prisma\dev.db')) {" ^
    "    Copy-Item (Join-Path $projectDir 'prisma\dev.db') (Join-Path $tempDir 'dev.db');" ^
    "    Write-Host '[Backup] Included: prisma/dev.db';" ^
    "}" ^
    "$uploadsDir = Join-Path $projectDir 'public\uploads';" ^
    "if (Test-Path $uploadsDir) {" ^
    "    $items = Get-ChildItem $uploadsDir -Exclude '.gitkeep';" ^
    "    if ($items.Count -gt 0) {" ^
    "        $destUploads = Join-Path $tempDir 'uploads';" ^
    "        New-Item -ItemType Directory -Path $destUploads | Out-Null;" ^
    "        Copy-Item (Join-Path $uploadsDir '*') $destUploads -Recurse -Exclude '.gitkeep';" ^
    "        $fileCount = (Get-ChildItem $destUploads -Recurse -File).Count;" ^
    "        Write-Host \"[Backup] Included: $fileCount uploaded file(s)\";" ^
    "    }" ^
    "}" ^
    "$envFile = Join-Path $projectDir '.env.local';" ^
    "if (Test-Path $envFile) {" ^
    "    Copy-Item $envFile (Join-Path $tempDir '.env.local');" ^
    "    Write-Host '[Backup] Included: .env.local';" ^
    "}" ^
    "$zipPath = Join-Path '%BACKUP_DIR%' '%ZIP_NAME%';" ^
    "Compress-Archive -Path (Join-Path $tempDir '*') -DestinationPath $zipPath -Force;" ^
    "Remove-Item $tempDir -Recurse -Force;" ^
    "$sizeMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2);" ^
    "Write-Host \"[Backup] Created: backups\%ZIP_NAME% ($sizeMB MB)\";"

echo [Backup] Done.
endlocal
