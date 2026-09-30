---
layout: page
title: Software
permalink: /software/
description: Open source software by Florian Krämer — cognitive code analysis, PHPStan rules, git churn metrics, DDD tools, and event sourcing for PHP.
keywords: open source, software, cognitive code analysis, PHPStan, git churn, event sourcing, context map, PHP, C#, Java
---

Open source projects I maintain or contribute to. Source code and releases are on GitHub.

## Code Analysis

<div class="services-grid">
  <div class="service-item">
    <h3><a href="https://github.com/Phauthentic/cognitive-code-analysis">Cognitive Code Analysis (PHP)</a></h3>
    <p>A cognitive code complexity analysis tool for PHP (<code>phpcca</code>). It measures how hard code is for a human to understand — complementary to cyclomatic complexity, which focuses on testability. Supports churn analysis, configurable thresholds, and multiple report formats.</p>
  </div>

  <div class="service-item">
    <h3><a href="https://github.com/floriankraemer/csharp-cognitive-code-analysis">Cognitive Code Analysis (C#)</a></h3>
    <p>C# port of the cognitive complexity analyser. Scans <code>*.cs</code> files and reports per-method cognitive metrics, with optional Halstead and cyclomatic complexity, Cobertura coverage, and output as console text, HTML, SARIF, or GitHub/GitLab annotations.</p>
  </div>

  <div class="service-item">
    <h3><a href="https://github.com/floriankraemer/cognitive-code-analysis-java">Cognitive Code Analysis (Java)</a></h3>
    <p>Java port of the cognitive complexity analyser. Measures how hard code is for a human to understand, with configurable thresholds and documentation on interpreting results.</p>
  </div>

  <div class="service-item">
    <h3><a href="https://github.com/Phauthentic/cognitive-code-analysis-github-action">Cognitive Code Analysis GitHub Action</a></h3>
    <p>Composite GitHub Action that runs Cognitive Code Analysis in pull-request workflows. Install via PHAR or Composer, analyse changed PHP files, and optionally publish Markdown PR comments, workflow annotations, artifacts, and SARIF uploads.</p>
  </div>

  <div class="service-item">
    <h3><a href="https://github.com/floriankraemer/git-churn-calculator">Git Churn Calculator</a></h3>
    <p>A cross-platform CLI tool that calculates a <strong>Churn Risk Score</strong> for every file in a git repository by combining change frequency, author spread, and optional Cobertura test coverage data. Output as CSV, JSON, HTML, or D3 time-series charts.</p>
  </div>

  <div class="service-item">
    <h3><a href="https://github.com/Phauthentic/phpstan-rules">PHPStan Rules</a></h3>
    <p>Additional <a href="https://phpstan.org/">PHPStan</a> rules focused on clean code and architecture conventions — method signatures, return types, dependency constraints, modular boundaries, and related checks. Rules can be extended at project level for domain-specific policies.</p>
  </div>
</div>

## DDD Tools

<div class="services-grid">
  <div class="service-item">
    <h3><a href="https://github.com/floriankraemer/ddd-context-mapper">DDD Context Mapper</a></h3>
    <p>A browser-based diagram editor for Domain-Driven Design context maps. Draw bounded contexts, connect them with directed relationships and DDD-style labels, then export and import the diagram as JSON — no build step or server required.</p>
  </div>
</div>

## Libraries

<div class="services-grid">
  <div class="service-item">
    <h3><a href="https://github.com/Phauthentic/event-sourcing">Event Sourcing</a></h3>
    <p>A framework-agnostic event sourcing library for PHP. Provides the basic building blocks with minimal third-party dependencies; aggregates can stay free of library coupling via reflection-based extraction.</p>
  </div>
</div>
