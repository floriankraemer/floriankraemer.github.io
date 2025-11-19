# Use Ruby as a parent image (more appropriate for Jekyll)
FROM ruby:3.2-slim

# Update the package index and install necessary packages
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory to /site
WORKDIR /site

# Copy Gemfile and Gemfile.lock to the container
COPY Gemfile Gemfile.lock ./

# Install Jekyll and dependencies
RUN gem install bundler && \
    bundle install

# Expose ports for Jekyll server and livereload
EXPOSE 4000 35729

# Create an entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

#RUN "rm -rf .jekyll-metadata _site"

# Default command (can be overridden)
CMD ["serve", "--drafts", "--future", "--host", "0.0.0.0"]
