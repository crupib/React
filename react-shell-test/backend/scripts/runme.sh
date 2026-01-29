#!/usr/bin/env bash
set -euo pipefail

echo "Hello from shell script! Posted by React"
echo "Date: $(date)"
echo "User: $(whoami)"
echo "Working dir: $(pwd)"

ping -c 3 google.com

# Simulate some work
sleep 1

echo "Done."

