#!/bin/bash
set -e

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

# rm -rf .jekyll-metadata _site

# Build the Jekyll site
echo "Building Jekyll site..."
docker-compose run --rm jekyll build

echo "Build completed! The site is available in the _site directory."
