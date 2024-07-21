---
layout: post
title: "Hexagonal architecture and DDD are not the same"
categories: software-architecture
tags: 
    - software-architecture
    - DDD
    - hexagonal-architecture
    - decoupling
draft: false
published: true
comments: true
---

## Recap: Hexagonal Architecture

Hexagonal architecture, also known as ports and adapters architecture, is a design pattern that promotes the separation of concerns in software systems. The core principle is to organize the application into concentric hexagons, each representing a different layer of the system. At the center lies the application core, containing the business logic and domain entities. Surrounding it are the ports, which define interfaces through which the core interacts with the external world. Adapters, forming the outermost layer, implement these interfaces and connect the application to external dependencies such as databases, UIs, or third-party services.

![Hexagonal Architecture Diagram](/assets/diagrams/Hexagonal-Architecture.svg)

## How does DDD fit into that?

I personally do not consider the tactical aspect of DDD an architecture, it is just a "tactical" pattern. In DDD, tactical patterns provide guidance on how to structure the domain model within **a bounded context** to effectively capture and represent the business domain. These patterns include Aggregate, Entity, Value Object, Repository, and more. In what bigger picture you apply those patterns is up to you, it doesn't has to be a hexagonal architecture.

The diagram is probably a lot more expressive than any tex:

![DDD in the Hexagonal Architecture Diagram](/assets/diagrams/DDD-Hexagonal-Architecture.svg)

## So what should go into which layer?

| Domain Layer | Application Layer | Infrastructure Layer | Interface Layer (Optional) |
|--------------|-------------------|----------------------|----------------------------|
| - Entities (Core domain objects) | - Application Services / Use Cases | - ORM Configurations | - Controllers (for Web APIs or MVC) |
| - Value Objects | - Command and Query Objects | - Database Migrations | - View Models |
| - Aggregates | - DTOs (Data Transfer Objects) | - External Service Integrations | - Views (for web applications) |
| - Domain Events | - Mappers/Assemblers (Domain <-> DTO) | - Messaging Systems (e.g., Message Queues) | - API Resources/Presenters |
| - Domain Services | - Input Validation | - Caching Mechanisms | - Request/Response Formatters |
| - Repository Interfaces | - Application-specific Exceptions | - Logging and Monitoring | - Authentication Middleware |
| - Domain Exceptions | - Event Handlers (for Domain Events) | - Security Implementations | - Route Definitions |
| - Specification Objects | - Facades (if needed to simplify complex subsystems) | - File System Operations | - User Interface Components |
| - Domain-specific Interfaces | - Mediator (for CQRS implementations) | - Email Services | |
| - Enumeration Classes | | - Repository Implementations | |
| | | - Infrastructure-specific Exceptions | |
| | | - Third-party Library Wrappers | |
| | | - Configuration Management | |
| | | - Dependency Injection Container Configuration | |