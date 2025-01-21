#!/bin/bash

bundle install --retry 5 --jobs 20
bundle exec jekyll build

jekyll build