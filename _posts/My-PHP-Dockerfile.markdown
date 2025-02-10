---
layout: post
title: 'My PHP CLI Dockerfile'
categories: software-architecture
tags:
  - PHP
  - Docker
date: 2025-01-20T22:11:34.000Z
draft: false
comments: true
---

```bash
FROM php:8.3-cli

# Add the PHP Extension Installer to make installing extensions much easier
# https://github.com/mlocati/docker-php-extension-installer
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apt-get update
RUN apt-get install -y zip git wget gpg bash sudo curl nano

# Enable SQLite and PostgreSQL extensions
RUN install-php-extensions pdo pdo_sqlite pdo_pgsql pdo_mysql zip bcmath intl \
    xdebug amqp memcached imagick openssl iconv mcrypt gettext gmp bz2 xsl gettext

RUN echo "xdebug.mode=coverage,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "memory_limit=512M" >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN git config --global --add safe.directory /app

# Add Phive
COPY docker/php/phive.sh /usr/local/bin/phive.sh
RUN chmod +x /usr/local/bin/phive.sh
RUN /usr/local/bin/phive.sh

## Add PHP Metrics
## https://phpmetrics.org/
RUN curl -L "https://github.com/phpmetrics/PhpMetrics/blob/master/releases/phpmetrics.phar?raw=true" -o phpmetrics.phar
RUN chmod +x phpmetrics.phar && mv phpmetrics.phar /usr/local/bin/phpmetrics

# Add Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | sudo -E bash
RUN sudo apt install symfony-cli

# Add Open API Generator
RUN wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.9.0/openapi-generator-cli-7.9.0.jar -O /usr/local/bin/openapi-generator-cli.jar \
    && ln -s /usr/local/bin/openapi-generator-cli.jar /usr/local/bin/openapi-generator-cli \
    && chmod +x /usr/local/bin/openapi-generator-cli.jar

# Create a new "php" user
RUN useradd -m php

# Add php user to sudoers
RUN echo "php ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set the new user as the default user for the container
USER php
```
