#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$PROJECT_DIR/backups"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="quiz-prep-backup_${TIMESTAMP}.zip"

echo "[Backup] Starting backup..."

# Create backups folder if needed
mkdir -p "$BACKUP_DIR"

# Check that there's something to back up
HAS_DATA=0
[ -f "$PROJECT_DIR/prisma/dev.db" ] && HAS_DATA=1
if [ -d "$PROJECT_DIR/public/uploads" ]; then
    UPLOAD_COUNT=$(find "$PROJECT_DIR/public/uploads" -mindepth 1 -not -name ".gitkeep" 2>/dev/null | head -1)
    [ -n "$UPLOAD_COUNT" ] && HAS_DATA=1
fi

if [ "$HAS_DATA" -eq 0 ]; then
    echo "[Backup] Nothing to back up — no database or uploads found."
    exit 0
fi

# Create temp staging directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf '$TEMP_DIR'" EXIT

# Copy database
if [ -f "$PROJECT_DIR/prisma/dev.db" ]; then
    cp "$PROJECT_DIR/prisma/dev.db" "$TEMP_DIR/dev.db"
    echo "[Backup] Included: prisma/dev.db"
fi

# Copy uploads
if [ -d "$PROJECT_DIR/public/uploads" ]; then
    ITEMS=$(find "$PROJECT_DIR/public/uploads" -mindepth 1 -not -name ".gitkeep" 2>/dev/null)
    if [ -n "$ITEMS" ]; then
        mkdir -p "$TEMP_DIR/uploads"
        cp -r "$PROJECT_DIR/public/uploads/"* "$TEMP_DIR/uploads/" 2>/dev/null
        rm -f "$TEMP_DIR/uploads/.gitkeep" 2>/dev/null
        FILE_COUNT=$(find "$TEMP_DIR/uploads" -type f | wc -l)
        echo "[Backup] Included: $FILE_COUNT uploaded file(s)"
    fi
fi

# Copy .env.local
if [ -f "$PROJECT_DIR/.env.local" ]; then
    cp "$PROJECT_DIR/.env.local" "$TEMP_DIR/.env.local"
    echo "[Backup] Included: .env.local"
fi

# Create zip
echo "[Backup] Creating $ZIP_NAME..."
cd "$TEMP_DIR"

# Use PowerShell on Windows (Git Bash), zip on Unix
if command -v powershell &>/dev/null; then
    ABS_ZIP="$(cygpath -w "$BACKUP_DIR/$ZIP_NAME")"
    ABS_SRC="$(cygpath -w "$TEMP_DIR")"
    powershell -NoProfile -Command "Compress-Archive -Path '$ABS_SRC\\*' -DestinationPath '$ABS_ZIP' -Force"
elif command -v zip &>/dev/null; then
    zip -r "$BACKUP_DIR/$ZIP_NAME" . -x "*.DS_Store"
else
    echo "[Backup] Error: No zip tool available (need powershell or zip)."
    exit 1
fi

# Report size
if [ -f "$BACKUP_DIR/$ZIP_NAME" ]; then
    SIZE=$(du -h "$BACKUP_DIR/$ZIP_NAME" | cut -f1)
    echo "[Backup] Created: backups/$ZIP_NAME ($SIZE)"
else
    echo "[Backup] Error: Failed to create zip file."
    exit 1
fi

echo "[Backup] Done."
