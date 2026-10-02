# Makefile

.DEFAULT_GOAL := help

# Default target: list all available commands, grouped by the "##@" headings below
.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "; printf "\nUsage: make \033[36m<target>\033[0m\n"} \
		/^##@/ {printf "\n\033[1;33m%s\033[0m\n", substr($$0, 5)} \
		/^[a-zA-Z_-]+:.*##/ {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo

##@ Development

.PHONY: dev
dev: ## Start the dev server in the foreground at http://localhost:4000 (live reload, drafts)
	./serve.sh

.PHONY: check
check: ## Build the site like production and run the same checks as CI (script/check)
	docker compose run --rm -T -e SITE_DIR=/tmp/site-check jekyll bash script/check

##@ Container

.PHONY: up
up: ## Start the Jekyll container in the background
	docker compose up -d

.PHONY: down
down: ## Stop the Jekyll container
	docker compose down

.PHONY: logs
logs: ## Show logs for the Jekyll container
	docker compose logs -f

.PHONY: build
build: ## Build (or rebuild) the Jekyll container
	docker compose build

##@ Shell

.PHONY: bash
bash: ## Open a bash shell inside the running Jekyll container
	docker compose exec jekyll /bin/bash

.PHONY: shell
shell: ## Rebuild, start, and open a shell in the Jekyll container with setup
	@echo "Rebuilding and starting Jekyll container..."
	docker compose down || true
	docker compose build --no-cache
	@echo "Starting container with shell override..."
	docker compose run --rm jekyll /bin/bash -c "cd /site && echo 'Installing dependencies...' && bundle install --retry 3 && echo 'Setup complete. Type: bundle exec jekyll serve' && /bin/bash"
