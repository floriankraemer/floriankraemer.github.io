
## Why would you build a modular monolith?

* You might have an existing big ball of mud that you can't easily replace but want to start refactoring it by giving parts of it a structure in form of modules.
* You want an extendible application platform as product in which modules can be fully replaced or customized.
* You want a clean architecture that keeps you the door open to extract and move modules into separate deployment units (Microserivces) later for e.g. scalability reasons.

## Modular System Design

Modular system design is more than just splitting an application into pieces — it's about creating cohesive, self-contained modules that align with business goals and enhance the developer experience. A well-structured system, whether a Modular Monolith, Vertical Slices, Ports & Adapters, a Microservice architecture or a blend of different architectural styles, minimizes dependencies and maximizes clarity, allowing developers to focus on their specific tasks without wading through unrelated code.

This article provides ways how modularity improves collaboration, reduces cognitive load, and fosters maintainable, scalable architectures by prioritizing strong cohesion and thoughtful separation of concerns. It addresses the concerns of cohesion and coupling in software systems.

Cohesion and coupling are the two fundamental and most important concepts that need to be understood first to understand how to deal with them to enable a flexible, modular architecture.

### Cohesion

Cohesion in software refers to the degree to which the elements within a module or class are functionally related and work together to achieve a single, well-defined purpose. High cohesion means that a module contains tightly related responsibilities, making it easier to maintain, understand, and extend. On the other hand, low cohesion indicates that a module handles unrelated tasks, leading to increased complexity and a higher likelihood of bugs. Striving for high cohesion aligns with clean code practices and improves overall software design by enhancing modularity and maintainability.

One study looking at the effectiveness of Cohesion can be found here. A tool to measure the metrics mentioned in the study that can be used with PHP is PhpMmetrics.

> *“Software engineering is a disciplined approach towards creating quality software products. To  get value for effort put into software design some subtle but critical underlying  characteristics  need to be given serious attention by knowledge engineers, software developers and practitioners. Remarkable quality attributes such as  maintainability and reusability are part of external properties of a system.”*  – Software Maintainability and Reusability using Cohesion Metrics, February 2017, International Journal of Computer Trends and Technology

### Coupling

Coupling in software refers to the degree of interdependence between modules or components. Using Connascence, a concept by Meilir Page-Jones, coupling can be categorized by types and levels of dependency, ranging from simple naming dependencies to more complex logic and timing dependencies.

Vladik Khononov defines coupling as the amount of knowledge one component must have about another to function correctly, emphasizing the impact on flexibility and maintainability. Minimizing coupling is essential for creating robust, adaptable systems where changes in one module do not excessively affect others.

Recommended Talks about this topic:

Design Accelerator: Good Coupling, Bad Coupling, Coupling FTW
Balancing Coupling in Software Design (Vlad Khononov)

## Modular Monolith vs Microservices

The question that always comes up is when to chose Microservices over a modular Monolith.



| Quality Attribute         | Modular Monolith                                 | Microservices                                      |
|---------------------------|---------------------------------------------------|----------------------------------------------------|
| **Modularity**            | High (via internal modules)                      | Very High (via service boundaries)                 |
| **Scalability**           | Limited to vertical scaling                      | High horizontal scalability                        |
| **Deployability**         | Single unit deployment                           | Independent deployments per service                |
| **Performance**           | High (in-process communication)                  | Lower (network overhead between services)          |
| **Fault Isolation**       | Lower (a bug may crash the whole app)            | Higher (isolated service failures)                 |
| **Operational Complexity**| Low (one app to monitor/deploy)                 | High (distributed system, orchestration needed)    |
| **Data Consistency**      | Easier (single DB, transactional boundaries)     | Harder (eventual consistency, distributed txns)    |
| **Development Speed**     | Fast in early stages, slower as app grows        | Faster for large teams with strong boundaries      |
| **Technology Diversity**  | Low (typically single tech stack)                | High (each service can use different tech)         |
| **Testing Complexity**    | Simpler (integration is easier)                 | More complex (integration across services)         |
| **Team Autonomy**         | Limited (tight coupling via shared codebase)     | High (independent teams own services)              |
| **Maintainability**       | Good if modularized well                         | High per service, harder system-wide               |
| **Security**              | Simpler (internal calls, shared boundary)        | Complex (network-level, inter-service auth needed) |
