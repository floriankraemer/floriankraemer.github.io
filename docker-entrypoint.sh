#!/bin/bash
set -e

# Function to output error message
error() {
  echo "Error: $1"
  exit 1
}

# If the first argument is a Jekyll command
if [ "$1" = "serve" ] || [ "$1" = "build" ] || [ "$1" = "new" ]; then
  # Execute Jekyll command with all arguments
  exec bundle exec jekyll "$@"
elif [ "$1" = "bundle" ]; then
  # Execute bundle command directly
  exec bundle "${@:2}"
elif [ "$1" = "bash" ] || [ "$1" = "sh" ]; then
  # Execute shell if requested
  exec "$@"
else
  # Default to Jekyll serve if no recognized command
  echo "Running default command: bundle exec jekyll serve"
  exec bundle exec jekyll serve --host 0.0.0.0
fi
