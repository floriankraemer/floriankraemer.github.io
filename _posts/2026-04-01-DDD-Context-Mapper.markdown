---
layout: post
title: 'DDD Context Mapper: A sngle-page Tool for Context Maps'
categories: software-architecture
tags: 
    - software-architecture
    - documentation
    - ddd
    - domain-driven-design
    - tools
    - context-map
draft: false
published: true
comments: true
date: 2026-04-01T21:15:31.000Z
---

I built a single-page context mapper diagram tool because I was not happy with any tool I am aware of for this purpose. I also wanted the format to be **JSON**, easily machine readable, so I can export data from other systems and use this tool to visualize it without a proprietary file format or a heavy toolchain in between.

So far I have kept it **intentionally simple**. There is no need to bloat it into a ~160 MB Electron wrapper or to pull in hundreds of JavaScript dependencies through a build pipeline. The app is one static HTML file that uses [D3.js](https://d3js.org/) for layout and interaction; you open it in a browser and you are done. That is a deliberate application of the **KISS** principle: the smallest thing that does the job well.

If you are wondering whether a “full” desktop app would be better: for my own use, the answer is no. I care more about **portability**, **inspectability**, and **integration** (JSON in, diagram out) than about packaging complexity. I might extend the tool based on feedback—but the baseline will stay lean unless there is a strong reason not to.

## What it does

**DDD Context Mapper** is a browser-based editor for [Domain-Driven Design context maps](https://github.com/ddd-crew/context-mapping). You place **bounded contexts** as shapes on a canvas and connect them with **directed relationships** that can carry familiar DDD-style labels (for example Customer/Supplier, Shared Kernel, Anti-Corruption Layer) and upstream/downstream markers.

![Screenshot](/assets/images/screenshots/ddd-context-mapper.png)

![Screenshot](/assets/images/screenshots/ddd-context-mapper2.png)

## Try it

Keep `context-mapper.html` and `context-map.schema.json` in the same folder, then open the HTML file in a modern browser. If you want import validation, serve the folder with any static file server; on plain `file://` opens, validation may be skipped with a console warning.

Source and license: [ddd-context-mapper on GitHub](https://github.com/floriankraemer/ddd-context-mapper) (GPLv3).

---

Is this kind of minimal, web-first tool useful for how you work? Would you rather see it grow in place, or is “one HTML file + D3” already the sweet spot? I am curious what would actually help you in real workshops and documentation—not what would look impressive on a feature list.
