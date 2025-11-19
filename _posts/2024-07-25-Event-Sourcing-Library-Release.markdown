---
layout: post
title: 'Event Sourcing Library Release'
categories: software-architecture
tags:
  - event-sourcing
  - software-architecture
  - open-source
date: 2024-07-25T21:15:00.000Z
draft: false
published: true
comments: true
---

I've been working on an event sourcing library for some time now and I think it is time to release it.

[https://github.com/phauthentic/event-sourcing](https://github.com/phauthentic/event-sourcing)

## Background & Motivation

When I started with event sourcing I was working for a company where we had the need, or at this time, I thought we had the need for it.

Then it became my private pet project and I like the concept of event sourcing. I also think that to understand something really you should do a minimal implementation, an experiment. This experiment grew a little out of its experimental scope and ended in a complete event sourcing library.

I'm not sure if a lot people will adopt this library, because there are other libraries for PHP that are for longer available and therefore probably more stable.

However, I think that my library is a very lean and easy to integrate one and that you should evaluate it as well and not just jump right on another one.

## Design Goals

The driving quality attributes of the development of this library are:

* **Simplicity**: The code should be as minimal as possible and as decoupled as possible from any domain and framework.
* **Flexibility**: The library should be flexible enough to be used in a variety of scenarios.
* **Extensibility**: The library should be easy to extend.
* **Learnability**: The library should be easy to learn and getting started.

This means that the library tries to minimize 3rd party dependencies as much as possible. "Plain old PHP" objects are used as much as possible without relying on further abstraction and 3rd parties. I think that this makes the library more robust and easier to understand.

Other libraries may provide more features, but this library aims to provide a solid but **simple** foundation for building event sourced applications. Usually you should start small and then grow. I believe that this library here is a very good fit to get quickly started but is offering enough extension points to deal with more evolving complex scenarios as well.

## When would you use it

Event Sourcing will be a good architecture pattern for your application if you have requirements like a complete audit log, traceability and complex domain logic. The list gives you an overview of points, of which your project should match at least a few, otherwise you might introduce the additional complexity of Event Sourcing for no benefit.

* **Audit and Compliance Requirements**
  * **Complete History:** If your application needs to maintain a complete audit trail of changes for compliance or auditing purposes, event sourcing provides a natural fit.
  * **Traceability:** You can trace all state changes back to their origins, which is useful for understanding the lifecycle of entities.
* **Complex Domain Logic**
  * **Behavioral Consistency:** When dealing with complex business rules and domain logic, event sourcing helps ensure that all changes are recorded and can be replayed to recreate state.
  * **Event-Driven Systems:** In systems where business processes are inherently event-driven, event sourcing aligns well with the natural flow of events.
* **Event Replay and Projections**
  * **State Reconstruction:** You can reconstruct the state of an entity at any point in time by replaying the sequence of events.
  * **Multiple Views:** Different views or projections of the data can be generated from the same sequence of events, allowing for flexible reporting and querying.
* **Integration with Other Systems**
  * **Integration:** Events can be published to other systems or services, enabling easy integration with other parts of your application or external systems.
  * **Asynchronous Processing:** Events can be processed asynchronously, allowing for scalable and decoupled architectures.

## When to not use it

Event sourcing comes with additional complexity. You should **not** use event sourcing when you don't need it. It is a powerful tool, but it is not a silver bullet. It is not a one-size-fits-all solution. Event sourcing is a good solution for scenarios like audit logging, undo/redo functionality, and complex business rules.

If you have no good reasons to use event sourcing, then don't use it. It won't be beneficial for your project and will only introduce unnecessary complexity!
