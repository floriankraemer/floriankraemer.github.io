---
layout: post
title: 'Hexagonal Architecture and DDD'
categories: software-architecture
tags: 
    - software-architecture
    - DDD
    - hexagonal-architecture
    - ports-and-adapters
    - decoupling
draft: true
published: false
comments: true
date: 2025-04-30
---

I've seen recently some people discussing if DDD and and hexagonal architecture is the same thing or how they work together. This article will provide a comprehensive answer.

## Recap: Ports & Adapters (Hexagonal)

[Alistair Cockburn](https://en.wikipedia.org/wiki/Alistair_Cockburn) was the first to describe this architecture and popularized this architecture but called it "Ports and Adapters". The name "hexagonal" comes from the the fact that this architecture was and still is often presented using a hexagonal diagram.

It is a design pattern that promotes the separation of concerns in software systems. The core principle is to organize the application into layers, like an onion, each representing a different layer of the system. At the center lies the application core, containing the business logic and domain entities.

The **inner** layers define the ports, which define interfaces through which the core interacts with the external world. Adapters, forming the outermost layer, implement these interfaces and connect the application to external dependencies such as databases, UIs, or third-party services.

![DDD in the Hexagonal Architecture Diagram](/assets/diagrams/ddd-ports-and-adapters.svg)

## How does DDD fit into that?

I personally do not consider the tactical aspect of DDD an architecture, it is just a (tactical) pattern. In DDD, tactical patterns provide guidance on how to structure the domain model within **a bounded context** to effectively capture and represent the business domain. These patterns include Aggregate, Entity, Value Object, Repository, and more. In what bigger picture you apply those patterns is up to you, it certainly doesn't has to be a hexagonal architecture style!

The purpose of an aggregate in a nutshell is to provide a consistence boundary because it must be persisted in one transaction. It also should only care about a mutation of state and not be re-used for presentation purposes.

The diagram is probably a lot more expressive than any text:

![DDD in the Hexagonal Architecture Diagram](/assets/diagrams/ddd-in-ports-and-adapters-detailed.svg)

## What should go into which Layer?


| Domain Layer | Application Layer | Infrastructure Layer | Presentation Layer |
|--------------|-------------------|----------------------|----------------------------|
| Entities (Core domain objects) | Application Services / Use Cases | ORM Configurations | Controllers (for Web APIs or MVC) |
| Value Objects | Command and Query Objects | Database Migrations | View Models |
| Aggregates | DTOs (Data Transfer Objects) | External Service Integrations | Views (for web applications) |
| Domain Events | Mappers/Assemblers (Domain <-> DTO) | Messaging Systems (e.g., Message Queues) | API Resources/Presenters |
| Domain Services | Input Validation | Caching Mechanisms | Request/Response Formatters |
| Repository Interfaces | Application-specific Exceptions | Logging and Monitoring | Authentication Middleware |
| Domain Exceptions | Event Handlers (for Domain Events) | Security Implementations | Route Definitions |
| Specification Objects | Facades (if needed to simplify complex subsystems) | File System Operations | User Interface Components |
| Domain-specific Interfaces | Mediator (for CQRS implementations) | Email Services | |
| Enumeration Classes | | Repository Implementations | |
| | | Infrastructure-specific Exceptions | |
| | | Third-party Library Wrappers | |
| | | Configuration Management | |
| | | Dependency Injection Container Configuration | |

## Conclusion

There is a very clear separation of concerns between the layers in the ports and adapters architecture. DDDs tactical patterns fit very well into it, because DDD itself forces a boundary by its patterns around the domain.

* Clean Architecture and DDD have no dependency.
* DDDs tactical patterns can be used in any architecture.
* DDD and clean architecture work just fine together.
