# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "simplefoc-docs-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["SimpleFOC Team"]
  spec.email         = ["info@simplefoc.com"]

  spec.summary       = %q{A modern, highly customizable, and responsive Jekyll theme for documention with built-in search.}
  spec.homepage      = "https://github.com/askuric/docs_template"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README)}i) }
  spec.executables   << 'simplefoc-docs-theme'
  
  spec.add_runtime_dependency "bundler", ">= 2.1.4"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5", "< 4.1.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "> 2.0"
  spec.add_runtime_dependency "jekyll-toc", "> 0"
  spec.add_runtime_dependency "kramdown-parser-gfm", ">= 1.1.0"
  spec.add_runtime_dependency "rake", ">= 12.3.1", "< 13.1.0"
  spec.add_runtime_dependency "jekyll-include-cache", "> 0"

end
