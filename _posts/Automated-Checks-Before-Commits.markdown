

checks.sh

```bash
#!/bin/bash

# - It wil execute PHPCBF first to automatically fix any coding standard issues.
# - This script will then run PHPCS, PHPStan and PHPUnit in parallel.
# - It will only execute PHPCS and PHPStan on modified files.
# - It will execute the checks on all files if the "--all" argument is passed.
# - PHPUnit will execute ALL tests.

# Check if "--all" argument is passed
if [[ "$1" == "--all" ]]; then
    CHANGED_PHP_FILES=""
else
    # Get list of changed PHP files
    CHANGED_PHP_FILES=$(git diff --name-only --diff-filter=ACMR | grep '^src/.*\.php$')
fi

# Run PHPCBF
if [[ "$1" == "--all" || -n "$CHANGED_PHP_FILES" ]]; then
    echo "Running PHPCBF..."
    bin/phpcbf $CHANGED_PHP_FILES > var/log/phpcbf.log 2>&1
    echo -e "\e[32m✅ PHPCBF executed\e[0m"
else
    echo "No PHP files changed for PHPCBF."
fi

# Run PHP-CS-Fixer on all files
echo "Running PHP-CS-Fixer..."
bin/php-cs-fixer fix > var/log/php-cs-fixer.log 2>&1 &
PHPCS_FIXER_PID=$!

# Run PHPCS in the background
if [[ "$1" == "--all" || -n "$CHANGED_PHP_FILES" ]]; then
    echo "Running PHPCS..."
    bin/phpcs $CHANGED_PHP_FILES > var/log/phpcs.log 2>&1 &
    PHPCS_PID=$!
else
    echo "No PHP files changed for PHPCS."
    PHPCS_PID=0
fi

# Run PHPStan in the background
if [[ "$1" == "--all" || -n "$CHANGED_PHP_FILES" ]]; then
    echo "Running PHPStan..."
    bin/phpstan analyse $CHANGED_PHP_FILES > var/log/phpstan.log 2>&1 &
    PHPSTAN_PID=$!
else
    echo "No PHP files changed for PHPStan."
    PHPSTAN_PID=0
fi

# Run PHPUnit in the background
echo "Running PHPUnit..."
bin/phpunit --stop-on-failure --order-by=defects,duration --display-warnings > var/log/phpunit.log 2>&1 &
PHPUNIT_PID=$!

# Wait for all processes to complete
if [ $PHPCS_FIXER_PID -ne 0 ]; then
    wait $PHPCS_FIXER_PID
    if [ $? -eq 0 ]; then
        echo -e "\e[32m✅ PHP-CS-Fixer passed\e[0m"
    else
        echo -e "\e[31m❌ PHP-CS-Fixer failed\e[0m check ./var/log/php-cs-fixer.log"
    fi
fi

if [ $PHPCS_PID -ne 0 ]; then
    wait $PHPCS_PID
    if [ $? -eq 0 ]; then
        echo -e "\e[32m✅ PHP Code Sniffer passed\e[0m"
    else
        echo -e "\e[31m❌ PHP Code Sniffer failed\e[0m check ./var/log/phpcs.log"
    fi
fi

if [ $PHPSTAN_PID -ne 0 ]; then
    wait $PHPSTAN_PID
    if [ $? -eq 0 ]; then
        echo -e "\e[32m✅ PHPStan passed\e[0m"
    else
        echo -e "\e[31m❌ PHPStan failed\e[0m check ./var/log/phpstan.log"
    fi
fi

wait $PHPUNIT_PID
if [ $? -eq 0 ]; then
    echo -e "\e[32m✅ PHPUnit passed\e[0m"
else
    echo -e "\e[31m❌ PHPUnit failed\e[0m check ./var/log/phpunit.log"
fi
```

composer.json

```json
"post-install-cmd": [
    "@auto-scripts",
    "ln -s ../../pre-commit .git/hooks/pre-commit || true",
    "ln -s ../../pre-push .git/hooks/pre-push || true"
],
```
