---
layout: post
title: 'Identify Risky Files in Your Git Repositories'
categories: software-architecture
tags: 
    - software-quality
    - code-hygiene
    - risk
draft: false
published: true
comments: true
date: 2026-03-27T08:01:41.000Z
---

Michael Feathers: His 24+ techniques are primarily Dependency Breaking Patterns. The goal isn't just "clean code"—it is to break the bonds that prevent you from putting a class into a test harness. Many of his moves (like Introduce Static Setter) are considered "temporary hacks" to enable testing.

Kent Beck: His "Tidyings" are about the economics of software. He argues that small, low-risk readability improvements (like Reading Order or Guard Clauses) make the subsequent feature work cheaper and faster.

Emily Bache: Her list is seemingly heavily influenced by Martin Fowler’s Refactoring catalog but updated for modern IDE workflows and the EPIC (Examine, Prepare, Implement, Clear) cycle. Her metaphors of Peel and Slice are highly effective for teaching developers how to quickly isolate legacy logic.

| Michael Feathers (Legacy Code) | Kent Beck (Tidy First?) | Emily Bache (Samman Coaching) | Primary Goal |
| --- | --- | --- | --- |
| Characterization Test | — | (EPIC: Examine) | Establish baseline behavior before changing code. |
| Sprout Method | Extract Helper | Extract Function / Method | Adding new features as fresh, testable units. |
| Sprout Class | — | Extract Class | Avoiding bloating existing legacy classes. |
| Wrap Method / Wrap Class | New Interface, Old Impl. | Parallel Change | Adding behavior by wrapping the old code. |
| Extract and Override Call | — | Slice | Isolating a single hard-to-test dependency. |
| Subclass and Override Method | — | Peel | Overriding logic in a test-subclass to break dependencies. |
| Parameterize Constructor | Explicit Parameters | Introduce Parameter Object | Injecting dependencies instead of hard-coding them. |
| Parameterize Method | — | — | Making a method more flexible to external input. |
| Break Out Method Object | — | Replace Function with Command | Turning a long method into a class to manage state. |
| Expose Static Method | — | Replace Command with Function | Moving logic to a static context to make it reachable. |
| Encapsulate Global Variable | — | Encapsulate Variable / Field | Controlling access to global state. |
| Replace Global Ref. with Getter | — | — | Adding a seam for global variables. |
| Pull Up / Push Down Method | Cohesion Order | Move Function / Move Method | Moving logic to the correct level of abstraction. |
| Introduce Static Setter | — | — | A "hack" to inject dependencies into Singletons. |
| Adapt Parameter | — | — | Creating an interface for a hard-to-mock type. |
| Instance Delegator | — | — | Moving static logic to an instance for testability. |
| Template Method | — | Replace Cond. with Strategy | Using polymorphism to vary parts of an algorithm. |
| Scratch Refactoring | One Pile | Refactoring Golf | Drastic, temporary changes to aid understanding. |
| — | Guard Clauses | Lift Up Conditional | Flattening nested logic to find the "happy path." |
| — | Dead Code | Remove Dead Code | Deleting unused code to reduce complexity. |
| — | Explaining Variable | Extract Variable | Naming an expression to reveal intent. |
| — | Normalize Symmetries | Inline Function / Method | Standardizing how similar things are done. |
| — | Reading Order | Composed Method | Ordering code to tell a better story. |
| — | Chunking | Split Phase / Split Loop | Separating distinct tasks within a single block. |
| Seams (Link/Object/Compile) | — | — | Finding places to change behavior without editing. |
| Definition Hoisting | — | — | Moving declarations to enable dependency injection. |
| — | — | Replace Primitive with Object | Creating domain-specific types for clarity. |
| — | — | Split Variable | Ensuring one variable has only one responsibility. |
| — | — | Transform Return Type | Wrapping return values to allow future expansion. |
| — | — | Split Message Chain | Breaking up "Train Wrecks" (Law of Demeter). |
