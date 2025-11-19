#!/bin/bash
set -e

echo "Cleaning up build artifacts..."

# Remove Node.js artifacts
find . -name "node_modules" -type d -prune -exec rm -rf {} +
find . -name "dist" -type d -prune -exec rm -rf {} +
find . -name "*.tgz" -type f -delete

# Remove Python artifacts
find . -name "build" -type d -prune -exec rm -rf {} +
find . -name "*.egg-info" -type d -prune -exec rm -rf {} +
find . -name "__pycache__" -type d -prune -exec rm -rf {} +
find . -name ".pytest_cache" -type d -prune -exec rm -rf {} +
find . -name ".coverage" -type f -delete

echo "Cleanup complete."
