#!/bin/bash
set -e

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

# rm -rf .jekyll-metadata _site

# Build and start the Jekyll container
echo "Starting Jekyll blog at http://localhost:4000"
docker-compose up --build
