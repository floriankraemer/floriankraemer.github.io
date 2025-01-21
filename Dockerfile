# Use the latest Alpine Linux as the base image
FROM alpine:latest

# Set environment variables for Ruby and Jekyll
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    GEM_HOME=/usr/local/bundle \
    PATH=/usr/local/bundle/bin:$PATH

# Install required dependencies
RUN apk update && apk add --no-cache \
    build-base \
    ruby \
    ruby-dev \
    ruby-bundler \
    bash \
    libffi-dev \
    zlib-dev \
    git \
    nodejs \
    npm

RUN rm -rf ~/.gem
RUN gem update
RUN gem install bundle
RUN gem install --no-document jekyll 
RUN jekyll --version
RUN apk del build-base ruby-dev

# Set a working directory
WORKDIR /srv/jekyll

# Expose default Jekyll server port
EXPOSE 4000

# Default command
CMD ["jekyll", "serve", "--host", "0.0.0.0"]
