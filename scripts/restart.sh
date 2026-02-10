#!/bin/bash
echo "[Quiz Prep Bot] Restarting dev server..."
"$(dirname "$0")/stop.sh"
sleep 2
"$(dirname "$0")/start.sh"
