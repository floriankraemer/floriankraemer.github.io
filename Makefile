# Makefile

# Default target: list all available commands
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make up          - Start the Jekyll container"
	@echo "  make down        - Stop the Jekyll container"
	@echo "  make logs        - Show logs for the Jekyll container"
	@echo "  make bash        - Open a bash shell inside the Jekyll container"
	@echo "  make shell       - Rebuild, start, and open shell in Jekyll container"
	@echo "  make build       - Build (or rebuild) the Jekyll container"

# Start the Jekyll container
.PHONY: up
up:
	docker compose up -d

# Stop the Jekyll container
.PHONY: down
down:
	docker compose down

# Show logs for the Jekyll container
.PHONY: logs
logs:
	docker compose logs -f

# Open a shell in the running Jekyll container
.PHONY: bash
bash:
	docker compose exec jekyll /bin/bash

# Build the Jekyll container
.PHONY: build
build:
	docker compose build

# Rebuild, start, and open shell in Jekyll container with setup
.PHONY: shell
shell:
	@echo "Rebuilding and starting Jekyll container..."
	docker compose down || true
	docker compose build --no-cache
	@echo "Starting container with shell override..."
	docker compose run --rm jekyll /bin/bash -c "cd /site && echo 'Installing dependencies...' && bundle install --retry 3 && echo 'Setup complete. Type: bundle exec jekyll serve' && /bin/bash"
