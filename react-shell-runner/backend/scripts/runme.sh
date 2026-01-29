#!/usr/bin/env bash
set -euo pipefail

echo "Hello from shell script! Posted by React"
echo "Date: $(date)"
echo "User: $(whoami)"
echo "Working dir: $(pwd)"
echo ""

# DO NOT wrap ping in $(...) or you lose newlines
ping -c 3 google.com

echo ""
echo "Done."

