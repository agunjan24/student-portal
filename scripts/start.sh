#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "[Quiz Prep Bot] Starting dev server..."

# Check if port 3000 is already in use
if netstat -aon 2>/dev/null | grep -q ":3000.*LISTENING"; then
    echo "[Quiz Prep Bot] Port 3000 is already in use."
    echo "[Quiz Prep Bot] Run scripts/stop.sh first, or use scripts/restart.sh"
    exit 1
fi

# Remove stale lock file if present
if [ -f "$PROJECT_DIR/.next/dev/lock" ]; then
    rm -f "$PROJECT_DIR/.next/dev/lock"
    echo "[Quiz Prep Bot] Removed stale lock file."
fi

cd "$PROJECT_DIR"
npm run dev &
echo "[Quiz Prep Bot] Dev server starting on http://localhost:3000 (PID: $!)"
