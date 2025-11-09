---
layout: post
title: "Cognitive Code Analysis: Now with a Churn Analysis"
categories: software-architecture
tags: software-architecture
draft: false
date: 2025-06-30T10:10:34.000Z
published: true
comments: true
---

I'm happy to announce that I've added churn analysis to my [Cognitive Code Analysis tool for PHP](https://github.com/Phauthentic/cognitive-code-analysis)!

Churn measures how frequently code changes over time and how it's impacted. It helps identify the most frequently modified and complex areas in your codebase—typically the most error-prone and hardest to maintain.

As always, [the results require some interpretation](https://github.com/Phauthentic/cognitive-code-analysis/blob/master/docs/Cognitive-Complexity-Analysis.md#result-interpretation). Use caution and avoid assuming the worst when a file receives a high score. You may also want to [adjust the weighting parameters](https://github.com/Phauthentic/cognitive-code-analysis/blob/master/docs/Configuration.md) to better suit your context. Everything is explained in the documentation. If anything is missing, feel free to open a ticket on GitHub.

Currently, only Git is supported as the version control backend. If you need support for another VCS, feel free to create a ticket on GitHub.

![Churn Analysis Result Screenshot](/assets/images/screenshots/cognitive-code-analysis-churn-php.png)
