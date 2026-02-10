#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "[Quiz Prep Bot] Stopping dev server..."

FOUND=0

# Find PIDs listening on port 3000
PIDS=$(netstat -aon 2>/dev/null | grep ":3000.*LISTENING" | awk '{print $NF}' | sort -u)

if [ -n "$PIDS" ]; then
    FOUND=1
    for PID in $PIDS; do
        echo "[Quiz Prep Bot] Found server on PID $PID, sending graceful stop..."
        cmd //c "taskkill /PID $PID /T" >/dev/null 2>&1

        # Wait up to 5 seconds for graceful shutdown
        STOPPED=0
        for i in 1 2 3 4 5; do
            sleep 1
            if ! netstat -aon 2>/dev/null | grep -q ":3000.*LISTENING"; then
                STOPPED=1
                break
            fi
        done

        if [ "$STOPPED" -eq 0 ]; then
            echo "[Quiz Prep Bot] Graceful stop timed out. Force killing PID $PID..."
            cmd //c "taskkill /PID $PID /F /T" >/dev/null 2>&1
            sleep 1
        fi
    done
fi

# Also kill any node processes running next dev
NEXT_PIDS=$(cmd //c "wmic process where \"commandline like '%next dev%'\" get processid /value" 2>/dev/null | grep "=" | cut -d= -f2 | tr -d '\r')
if [ -n "$NEXT_PIDS" ]; then
    for PID in $NEXT_PIDS; do
        echo "[Quiz Prep Bot] Found next dev process PID $PID, killing..."
        cmd //c "taskkill /PID $PID /F /T" >/dev/null 2>&1
        FOUND=1
    done
fi

# Remove lock file
if [ -f "$PROJECT_DIR/.next/dev/lock" ]; then
    rm -f "$PROJECT_DIR/.next/dev/lock"
    echo "[Quiz Prep Bot] Removed lock file."
fi

if [ "$FOUND" -eq 0 ]; then
    echo "[Quiz Prep Bot] No running server found."
else
    echo "[Quiz Prep Bot] Server stopped."
fi
