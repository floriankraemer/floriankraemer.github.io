---
layout: post
title: 'Ports & Adapters (Hexagonal Architecture) - My Take on it'
categories: software-architecture
tags:
  - Software Architecture
  - Architecture
date: 2025-04-30T19:11:34.000Z
draft: true
comments: true
---

Ports and adapters are also known as “hexagonal architecture”. Ports and adapters is an architectural style to decouple external systems from the core of the business. A business has no interest in maintaining a specific framework or DB technology (unless this is the product of the company), a business wants its economical core interests to be implemented as good as possible and as cost efficient as possible. The most work should happen *within* the businesses core domain. A business cares about maintainability, scalability, and cost efficiency. Ports and adapters help to decouple that core from the outside world.

## Before we start

The proposed structure is for a modular system following ports and adapters is very likely not the only one and you can and should diverge from it as it matches **your** needs, as long as it sticks to the core principles of the architecture, the layering with the uni-directional dependencies and the concept of ports and adapters. More about that later. It is nonetheless recommended, that if you change it, you'll have very good reasons in form of quality attributes to change it.

The structure can be used with modules or bounded contexts, this article will use the concept of a business "Capability" as name for what someone else might call a module. Capabilities or modules are thought to be able to interact with each other through a clearly defined interface: A facade.

Also, consider this structure as opinionated despite the fact that it tried to align well with Vernaugh and Evans.

### The History & Meaning of the Hexagon

The geometric shape of the hexagon has nothing to do with the architecture. It just happened that [Alistair Cockburn](https://en.wikipedia.org/wiki/Alistair_Cockburn), the person who described this style first, has chosen the hexagon for the diagram in his presentation:

“The hexagon is not a hexagon because the number six is important, but rather to allow the people doing the drawing to have room to insert ports and adapters as they need, not being constrained by a one-dimensional layered drawing. The term ‘’hexagonal architecture’’ comes from this visual effect.” - Alistair Cockburn

Cockburn's diagrams illustrate the concept of ports and adapters, not a specific structure of a concrete implementation. An adapter sits on the outside, the controller itself is the adapter that transforms the incoming request and passes it into a port.

His diagrams:

![](/assets/images/illustrations/Hexagonal-architecture-basic-1.gif)

![](/assets/images/illustrations/Hexagonal-architecture-with-adapters.gif){: .align-center}

You can find them and his description if it on [his website](https://alistair.cockburn.us/hexagonal-architecture/).

## What are Ports & Adapters?

The basic idea of this architecture is to separate the ingoing and outgoing things from the part of your application that implements the business logic.

## Clean Architecture, Ports & Adapters or both?

They are different yet they complement each other very well.

In a nutshell, Ports and Adapters is less detailed conceptionally than Clean Architecture, while clean architecture defines layers in more detail.

The table below shows a high level comparison of both styles.

| Aspect                    | Ports and Adapters (Hexagonal)      | Clean Architecture                           |
|--------------------------|--------------------------------------|-----------------------------------------------|
| **Focus**                | Interaction between system and external actors | Layered control of business logic and data flow |
| **Structure**            | Hexagon with input/output ports      | Onion/circular layers from Entities to Frameworks |
| **Terminology**          | Ports, Adapters                      | Entities, Use Cases, Interface Adapters       |
| **Layers Defined**       | Flexible, less formally defined      | Strict: Entities → Use Cases → Interfaces → Frameworks |
| **Primary Concern**      | Decoupling from delivery & tech details | Organizing business logic in concentric layers |
| **Interaction Direction**| Adapters call Ports                  | Outer layers depend on inner ones             |
| **Entry Points**         | Multiple adapters (CLI, Web, etc.)   | Controllers or Gateways                       |
| **Origin**               | Alistair Cockburn (2005)             | Robert C. Martin (Uncle Bob, 2012)            |
| **Use of Interfaces**    | At the boundary (Ports)              | At every layer boundary                       |
| **Dependency Rule**      | Core doesn’t depend on outer layers  | Same (Dependency Inversion Principle)         |

### Ports & Adapters

Interfaces in Application layer act as Ports.

Infrastructure implementations (e.g., Persistence, Email, Message) are Adapters.

External triggers (CLI, HTTP, Messaging) are handled in Presentation and Infrastructure layers, calling into the Application layer via facades or use cases.

### Clean Architecture

Clear separation into layers: Application, Domain, Infrastructure, Presentation.

Application layer orchestrates domain logic via use cases and facades.

Domain layer contains pure business logic (aggregates, entities, value objects, services).

Presentation and Infrastructure layers depend on the inner layers — but never the reverse.

DTOs (Request/Response), facades, and error classes follow Clean Architecture conventions.

### What are we building?

This article aims for a Clean Architecture implementation that also fully aligns with Ports and Adapters. We are going to essentially apply both of them in the structure that is described further down in the article.

## Layers

The Application, Domain, and Infrastructure layers provide a clear separation of concerns, making software more maintainable, scalable, and adaptable. The Domain layer encapsulates core business rules, remaining independent of technical implementations. This separation ensures that business logic does not get entangled with application flow or infrastructure concerns, making it easier to update and extend.

### Application Layer

The application layer is responsible for orchestrating workflows and implementing use cases specific to the system. It acts as the intermediary between the domain and the outside world, ensuring that domain logic is correctly applied in response to user actions or system events.

This layer does not contain business rules but instead coordinates domain objects and services to fulfill use cases. It may also manage transactions, control the flow of data between layers, and return results or statuses to the caller (e.g., UI or API). The application layer should remain free of infrastructure or framework-specific code, focusing solely on coordinating interactions.

#### Application Layer Use Cases (Services)

Application services, or better and less ambiguous, use cases, belong to the application layer and orchestrate workflows, use cases, and interactions between domain objects, repositories, and external systems. They do not contain business logic but coordinate domain logic execution. Example: A TransferFundsService that manages money transfers by invoking domain services and persisting changes. For example by getting the balance from the account but handling the transaction in a separate aggregate, which is in fact the case in banking, and charging the account only after a successful transaction or reverting the state of it in the case of a failed transaction.

### Domain Layer

The domain layer represents the core business logic and rules of the system. It is the most critical part of the architecture and is completely independent of external technologies or frameworks. This layer contains entities (objects that encapsulate the core business data and behavior) and value objects (immutable objects representing specific concepts). 

It also includes domain “services” for business logic that doesn’t fit neatly into entities or value objects. The domain layer is responsible for enforcing all the business invariants and rules, ensuring the integrity of the system’s core purpose.

#### Domain Layer Services

Domain services encapsulate domain logic that doesn’t naturally fit within a single entity or value object. They belong to the domain layer, operate purely on domain concepts, and contain business rules. They do not depend on external systems like databases or messaging queues. Example: A CurrencyExchangeService that converts currencies based on domain rules.

Domain services express pure business logic, while application services handle workflow and coordination.

### Infrastructure Layer

The infrastructure layer is responsible for handling all external systems and technical details. This includes databases, APIs, file storage, messaging systems, and any third-party integrations. It provides implementations for interfaces defined in the domain or application layers, ensuring adherence to the dependency rule (outer layers depend on inner layers, not the reverse).

The infrastructure layer is also where framework-specific code, repositories, and persistence logic reside. It serves as a boundary for external communication, enabling the system to remain modular and resilient to technological changes.
Presentation Layer

### Presentation Layer - I/O and UI

First let's define "presentation": Presentation in this context means anything that interacts with the "outside" and returns any element in the system in a structure or format this system expects. A JSON or XML response, or even a CSV file, is a representation as much as a HTML page that is rendered. It could be a PDF, Image or any other binary presentation as well. It doesn’t matter if it's human readable or not. The presentation layer will turn results from the application layer into whatever structure or format the according presentation adapter needs.

The presentation layer is basically one or more adapters to the outside world, that can interact with different systems and technologies, that are adapted to the application layers interface. This decouples it from the actual application that now doesn't have to worry about the specifics of the "external" clients or systems.

A data model, or view model, should ideally represent the data in a state that doesn’t require further logic in the actual template, if a template language is needed. For example translations, date- and time or currency and number formation, should already have happened in the model, so that the template can simply output them.

A big advantage of this approach is that the view model is fully testable without the need of parsing HTML or XML to figure out if something was correctly shown. The tests for that are very straightforward and simple to write as well. So if something was removed or changed, it will be easily detectable as a change or failure within the view model tests.

It decouples the presentation data model from the actual output, which moves the dependency on the template parser and language further to the “outside” of the architectural model.

## Domain vs Application Layer Services

The domain and application layer services serve distinct purposes and operate at different levels of abstraction. In a nutshell, domain services focus on encapsulating domain logic, while application services focus on orchestrating the use cases and interactions within the application.

Business logic refers to the core rules, constraints, compliance requirements, calculations, and decision-making processes that define how a business operates within a given domain.

### Naming the “Services”

The naming of the services must follow the ubiquitous language, unless something is named “Service”, classes and files are not using the suffix “Service”. For some reason there is a tendency among people to suffix things with "Service" or "Manager". For example a “TaxCalculator” doesn’t need the “Service” suffix. It doesn’t add any value or information to it. That's as good as suffixing anything mechanical that can be driven with “Vehicle”: CarVehicle, TankVehicle, BikeVehicle. It adds no additional value or expressiveness.

### Domain Services

Domain services handle complex domain logic that doesn't naturally belong to any specific entity or value object but is still part of the business rules.

* They focus on business logic and enforce domain rules aka business rules.
* Operate within the boundaries of the domain model.
* Are stateless and typically don't persist or deal with infrastructure concerns.

### Application Services

Application services coordinate tasks and workflows (e.g. Saga pattern) but don’t contain business logic themselves. They delegate the actual business operations to domain services, repositories, or other components.

* They manage use cases and orchestrate the interaction between domain objects.
* Deal with external systems like databases, message queues, or third-party APIs.
* Are often responsible for transaction management and authorization.
  * Example: A service that handles a "Transfer Money" use case by coordinating domain services for debiting and crediting accounts.

## Dependency Flow Rules (Strict Layering)

Your layers must follow one-way dependencies:

* Presentation → Application (allowed ✅)
* Presentation → Domain (❌ forbidden)
* Presentation → Infrastructure (❌ forbidden)
* Application → Domain (allowed ✅)
* Application → Infrastructure (allowed ✅)
* Application → Presentation (❌ forbidden)
* Infrastructure → Application (❌ forbidden)
* Infrastructure → Domain (❌ forbidden)
* Infrastructure → Presentation (❌ forbidden)
* Domain → Application (❌ forbidden)
* Domain → Infrastructure (❌ forbidden)
* Domain → Presentation (❌ forbidden)

This ensures:

* The Domain Layer is pure (no dependencies on other layers and ideally third party libraries).
* The Application Layer only orchestrates use cases (no infrastructure implementation).
* The Infrastructure Layer acts as an adapter but does not influence business logic.
* The Presentation Layer deals only with in and output.

## Suggested Directory Structure

Now that we have clarified the high-level layers, we will take a look at the inner structure of each. The structure should work well in any framework and probably most object oriented languages.

Below this section I'll provide an exhaustive rational for this structure. Nothing in it was chosen randomly but with an intention and idea behind it. You are welcome to provide a constructive critic in the comments or to contact me on twitter or Linked in if you want to discuss an aspect of it!

```text
src/
|-- <CapabilityName>/                   # Root of the capability
|   |-- Application/                    # Application layer (ports)
|   |   |-- UseCases/                   # Use Cases / "Application services"
|   |   |-- EventHandler/               # External Event Handler (Integration Events)
|   |   |-- CommandHandler/             # Command Handler
|   |   |-- Request/                    # The input DTO for facades & use cases
|   |   |-- Response/                   # The return value DTO for facades & use cases
|   |   |-- <CapabilityName>Failure.php # Error Codes
|   |   |-- <CapabilityName>Facade.php  # Entry point for the model
|   |-- Domain/                         # Domain layer (pure business logic)
|   |   |-- Events/                     # Domain events
|   |   |-- Model/                      # Domain model(s)
|   |   |   |-- <Aggregate>/            # Aggregate sub-folder, if more than one
|   |   |   |-- <Entity>.php/           # Entities for domain models
|   |   |   |-- <Value-Object>.php/     # Value objects for aggregates
|   |   |   Services/                   # Domain-specific services
|   |   |   EventHandler/               # Domain internal Event Handlers
|   |-- Infrastructure/                 # Infrastructure layer (adapters)
|   |   |-- Persistence/                # Database repositories and configurations
|   |   |   |-- Schema/                 # Database schema files
|   |   |-- Dependencies/               # External dependency management
|   |   |-- Message/                    # Messaging systems (e.g., events, queues)
|   |   |-- Email/                      # Email integration
|   |-- Presentation/                   # Presentation layer (adapters)
|   |   |-- Cli/                        # Command Line
|   |   |   |-- ConsoleCommand/         # Commands
|   |   |   |-- ViewModel/              # View model objects
|   |   |   |-- ViewMapper/             # Mappers to map the data to desired outputs
|   |   |-- JsonApi/                    # JSON API
|   |   |   |-- Controller/             # Controllers
|   |   |   |-- ViewModel/              # View model objects
|   |   |   |-- ViewMapper/             # Mappers to map the data to desired outputs
|   |   |   |-- <ApiName>OpenAPI.yaml   # API documentation 
|   |   |-- Html/                       # HTTP layer
|   |   |   |-- Controller/             # HTTP controllers
|   |   |   |-- Form/                   # Forms
|   |   |   |-- ViewModel/              # View model objects
|   |   |   |-- ViewMapper/             # Mappers to map the data to desired outputs
|   |   |   |-- Templates/              # Templates
|   |-- <CapabilityName>Config.php      # Module specific configuration
|   |-- <CapabilityName>AsyncAPI.yaml   # API documentation events
```

## Recommended watch: A Mini-Series on Youtube by Vaughn Vernon

There is a miniseries of ~45min in total by Vaughn Vernon. The coupling video should be considered a “must-watch”, because it is pretty much what this document here is about.

[Design Accelerator: Ports and Adapters Architecture Part 1](https://www.youtube.com/watch?v=TC4e0hokDB8)
[Design Accelerator: Ports and Adapters Architecture Part 2](https://www.youtube.com/watch?v=V4nj8MXUv5k)
[Design Accelerator: Ports and Adapters Architecture Part 3](https://www.youtube.com/watch?v=UpesTQhQhTE)

## Conclusions

