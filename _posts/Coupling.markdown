---
layout: post
title: "Descriptions of Coupling"
categories: software-architecture
tags: software-architecture, coupling
---

This article will explore what coupling means, its history in the context of software architecture, and the different types of coupling. While coupling seems to be the enemy of flexibility and scalability, it is also a necessary core characteristic of any system.

## What is coupling?

Lets start with the lexical definition of coupling according to the [Oxford dictionary](https://www.oxfordlearnersdictionaries.com/definition/american_english/coupling).

> "[usually singular] an action of joining or combining two things"

But also this:

> "(technology) a thing that joins together two parts of something, two vehicles, or two pieces of equipment"



When two more more things are connected in someway together, we can call this a form of coupling. We can observe this on atomar level, where atoms are coupled together to form molecules. We can also observe this on a higher level , where molecules are coupled together to form cells, and so on.

Coupling is there inherent in any system, whether it's software, physical systems, or even biological systems. In software design, the goal is not to eliminate coupling entirely but to minimize it or manage it effectively.

Imagine a bowl full of beads, each bead represents a component in a system. Without a string they are disconnected and out of order, they are just a collection of beads. The strings that connect the pearls represent the coupling between and gives them an order and function based on requirements, i.e. like ordering them by their color to match the spectral colors of the light.

Giving certain structures and patterns in coupling a name is done for the reason of having a common language to explain, teach and share an understanding of a definition of coupling. System engineers have therefore come up with different ways of describing coupling.

## Descriptions of Coupling

Before Connascence and modern approaches like Vlad Khononov's coupling concept, the concepts of coupling and cohesion were introduced in the early 1970s as part of [Structured Programming](https://en.wikipedia.org/wiki/Structured_programming). These principles were formalized by Larry Constantine and further popularized in books like "[Structured Design: Fundamentals of a Discipline of Computer Program and Systems Design](https://www.amazon.de/-/en/Structured-Design-Fundamentals-Discipline-Computer/dp/0138544719)" by Larry Constantine and Edward Yourdon.

| **Aspect**                 | **Coupling & Cohesion (C&C)**                           | **Connascence**                                  | **Khononov’s Coupling**                    |
|----------------------------|-------------------------------------------------------|-------------------------------------------------|--------------------------------------------------|
| **Time of Introduction**   | 1970s ([Larry Constantine](https://en.wikipedia.org/wiki/Larry_Constantine), [Edward Yourdon](https://en.wikipedia.org/wiki/Edward_Yourdon))             | 1992 (Meilir Page-Jones)                        | Recent ([Vlad Khononov](https://vladikk.com/), 2020s)                    |
| **Number of Elements**     | **7 cohesion types** and **6 coupling types**          | **9 types of connascence** and **3 properties**                     | **4 coupling dimensions**                        |

## Coupling & Cohesion

The key concepts are coupling and cohesion. Cohesion is a measure of how interdependent two modules are. The goal is low coupling, meaning modules should have minimal dependency on each other. These principles remain foundational in software engineering, influencing how we design and evaluate modular systems today.

### Cohesion and its Types

Cohesion measures how well the components of a module work together to achieve a single purpose. Ideally, a module should be highly cohesive, meaning all its parts are closely related and work towards one goal. Here are the types of cohesion, ranked from the weakest to the strongest:

**Coincidental Cohesion:** This is the weakest form of cohesion and occurs when parts of a module are grouped arbitrarily without any logical relationship. For instance, a module that contains unrelated utilities, such as logging, file handling, and string manipulation, exhibits coincidental cohesion. This makes the module difficult to understand, maintain, or extend, and should be avoided entirely.

**Logical Cohesion:** A slight improvement, logical cohesion groups parts of a module that perform similar tasks but aren’t necessarily related functionally. For example, a module that houses operations like file reading, compression, and encryption simply because they all deal with files. While better than coincidental cohesion, it still lacks a clear focus.

**Temporal Cohesion:** Temporal cohesion occurs when parts of a module are grouped because they are executed at the same time or during the same lifecycle phase. Think of a startup module that initializes multiple unrelated components. Although practical, this approach can lead to scalability issues as the module grows.

**Procedural Cohesion:** This type of cohesion groups parts of a module that must follow a specific sequence of execution. For example, a function that reads data from a file, validates it, and then processes it. While better organized, it still ties the module to the exact order of execution, limiting flexibility.

**Communicational Cohesion:** A module exhibits communicational cohesion when its parts operate on the same dataset or resource. For example, a module that reads, processes, and writes to the same database table. This form of cohesion is practical and indicates a more focused design.

**Sequential Cohesion:** Sequential cohesion is stronger and occurs when the output of one part of the module serves as the input for the next. A data pipeline module, for instance, where data is fetched, filtered, and then transformed, exemplifies this type. It creates a logical flow and improves maintainability.

**Functional Cohesion:** The ideal form of cohesion, functional cohesion ensures that every part of the module contributes to a single, well-defined task. For example, a module designed solely to calculate loan interest based on input parameters. This makes the module easy to understand, reuse, and maintain, embodying the principle of single responsibility.

### Coupling and its Types

While cohesion focuses on the internal alignment of a module, coupling addresses the external dependencies between modules. The goal is to achieve low coupling, meaning modules should be as independent of each other as possible. Here’s a breakdown of the types of coupling, ranked from the most harmful to the most desirable:

**Content Coupling:** This occurs when one module directly modifies or relies on the internal workings of another. For instance, if Module A accesses and changes the private variables of Module B. This kind of coupling is extremely fragile, as changes in one module can cause unintended side effects in another.

**Common Coupling:** Common coupling happens when multiple modules share global data or state. For example, two modules that write to the same global variable. This creates a tangled web of dependencies that are hard to debug and maintain.

**External Coupling:** In this type, modules depend on shared external resources, such as files, databases, or hardware devices. For instance, two modules writing to the same configuration file. While this is manageable, it requires clear rules to prevent conflicts.

**Control Coupling:** Control coupling arises when one module dictates the behavior of another by passing control-specific information, such as a flag. For example, a function that takes a parameter to decide which algorithm to run. This limits the flexibility of the controlled module.

**Data Coupling:** Data coupling occurs when modules interact by passing only the data they need through well-defined parameters. For example, passing user details (like name and email) to another module. This is a good practice, especially when modules share minimal information.

**Message Coupling:** The most desirable type, message coupling happens when modules communicate through well-defined interfaces, such as API calls or message queues, without sharing direct data structures. For example, two microservices exchanging JSON payloads. This promotes modularity and makes systems easier to scale and evolve.

# Connascence

[Connascence](https://en.wikipedia.org/wiki/Connascence), introduced by Meilir Page-Jones in 1992, is a framework for understanding and evaluating the dependencies between software components. It categorizes different types of coupling and their impact on maintainability and changeability. By identifying and addressing connascence, developers can create systems that are more robust, flexible, and easier to evolve.

Connascence is characterized by three key properties:

1. **Strength** reflects how tightly two components are bound by the connascence type, with stronger connascence being harder to refactor or change.
2. **Degree** measures the number of elements involved in the dependency, where a higher degree can amplify the impact of changes.
3. **Locality** indicates whether the dependency spans within the same module or across multiple modules, with cross-module connascence being more critical to manage.

There are seven types of connascence, each with its own implications for system design and maintenance:

1. **Connascence of Name:** Components depend on consistent naming conventions (e.g., variable names).
2. **Connascence of Type:** Components require matching data types (e.g., passing an integer where one is expected).
3. **Connascence of Meaning:** Components rely on the semantic understanding of values (e.g., special codes like -1 for errors)
4. **Connascence of Position:** The order of arguments or data matters for correct functionality.
5. **Connascence of Execution:** Components must execute in a specific sequence.
6. **Connascence of Timing:** Timing dependencies dictate proper operation (e.g., synchronous calls).
7. **Connascence of Algorithm:** Components rely on sharing identical algorithms or implementations.

For a detailed explanation of each type and how to apply them to improve your software design, visit connascence.io. This site provides an in-depth breakdown and practical examples of connascence in action.

# Khononov’s Coupling Concept

TBD

[![Balancing Coupling in Software Design: Universal Design Principles for Architecting Modular Software Systems](/assets/images/books/balancing-coupling.jpg)](https://www.amazon.de/dp/B09RV3Z3TP)