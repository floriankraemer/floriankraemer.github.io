#!/bin/bash
set -e

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

COMPOSE="docker compose"
if ! $COMPOSE version > /dev/null 2>&1; then
  COMPOSE="docker-compose"
fi

# Drop stale incremental cache so index/articles listings stay in sync
rm -rf .jekyll-metadata

echo "Starting Jekyll at http://localhost:4000"
echo "Including drafts, unpublished posts, and future-dated posts."
echo "Live reload is enabled — saving a file triggers a full rebuild."
$COMPOSE up --build
