# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-fk"
  spec.version       = "1.0.0"
  spec.authors       = ["Florian Krämer"]
  spec.summary       = "Jekyll theme for florian-kraemer.net, following the Florian Krämer Corporate Design Manual v1.0."
  spec.homepage      = "https://florian-kraemer.net"
  spec.license       = "MIT"

  spec.files         = Dir["{_layouts,_includes,_sass,assets}/**/*", "LICENSE.txt"]

  spec.required_ruby_version = ">= 3.0"

  spec.add_runtime_dependency "jekyll", "~> 4.4"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6"
end
