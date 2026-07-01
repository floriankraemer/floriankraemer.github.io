---
layout: page
title: Event Storming
permalink: /ddd/event-storming/
---

## What is Event Storming?

Event Storming is a versatile and dynamic technique that leverages domain events to explore, understand, and model complex business processes. Originating from the principles of Domain-Driven Design, it serves as a powerful tool for fostering collaboration, discovering domain intricacies, and aligning the software system with business objectives. By engaging stakeholders in a visual and interactive workshop, Event Storming enables the creation of a shared understanding of the domain and drives the development of effective, business-aligned software solutions.

### The Origin of Event Storming

Event Storming was developed by Alberto Brandolini in 2013. He introduced this technique as a way to improve collaboration between technical and business stakeholders and to facilitate the exploration and discovery of complex business processes. Brandolini's goal was to create a more efficient, inclusive, and dynamic approach to understanding and modeling domain-driven design (DDD) concepts.

### The Idea Behind Event Storming

The core idea of Event Storming is to use domain events as the central element for modeling business processes. Domain events are significant occurrences within a system that reflect a change in state. By focusing on these events, stakeholders can map out the flow of the business process, understand the interactions between different components, and identify areas for improvement.

### The Context of Event Storming

Event Storming is rooted in Domain-Driven Design (DDD), an approach to software development that emphasizes aligning the software model with the business domain. In DDD, the domain model is central to the development process, and Event Storming serves as a powerful tool for discovering and refining this model.

### The Key Concepts in Event Storming

The followin elements represent literally, by color, the differen elements of Event Stormings:

- **Domain Events** (Orange): Domain events are pivotal occurrences that represent a change within the system. Examples include "OrderPlaced," "PaymentProcessed," or "ProductShipped."
- **Commands** (Blue): Commands are actions that trigger events. They represent intentions or actions that are carried out by users or other systems, such as "PlaceOrder" or "ProcessPayment."
- **Aggregates** (Light Yellow): Aggregates are clusters of domain objects that can be treated as a single unit for data changes. They define consistency boundaries within the system.
- **Policies** (Purple): Policies are business rules or conditions that govern the execution of commands and the occurrence of events.
- **Actors** (Yellow): Actors are individuals or systems that interact with the process by issuing commands or responding to events.
- **Views** (Green): Views (or Queries) represent the read models or projections that display information to users, showing the current state of the system.
- **Hotspots** (Red): Hotspots identify risks, bottlenecks, or areas of uncertainty that require special attention or further investigation.
- **Processes or Systems** (Pink): Processes or external systems represent automated workflows or third-party services that interact with the domain.

![Stamping Code Illustration](/assets/diagrams/DDD-Event-Storming-Stickies.svg){:style="display:block; margin-left:auto; margin-right:auto"}

## The whole Event Storming Process

Event Storming typically involves the following steps:

1. Preparation:
   - Identify the scope and objectives of the session.
   - Gather the necessary materials, such as sticky notes and markers.
2. Big Picture Event Storming:
   - Start with a high-level overview of the entire business process.
   - Map out major events and interactions to get a broad understanding of the domain.
3. Process Level Event Storming:
   - Focus on specific processes within the domain.
   - Explore the detailed sequence of events, commands, policies, and aggregates.
4. Design Level Event Storming:
   - Dive into the technical details of the process.
   - Define the structure of the system, identify aggregates, and design read models and projections.

The Design Level Event Storming is rarely done, often the process level is deep enough.

## Rules of Engagement in Event Storming

Event Storming has certain "rules of engagement" designed to facilitate effective and productive sessions. These rules ensure that the sessions remain focused, inclusive, and collaborative. Here are the common rules of engagement:

1. Focus on Events: Start by identifying and mapping domain events. These are key occurrences that represent changes in the state of the system.
2. Collaborative Participation: Encourage active participation from all stakeholders. Everyone’s perspective is valuable, whether they are technical or non-technical participants.
3. Use Sticky Notes: Write events, commands, and other elements on sticky notes and place them on a wall or board. This allows for easy rearrangement and visualization.
4. Time-Boxing: Set specific time limits for different phases of the session to maintain focus and efficiency. Avoid getting bogged down in details initially.
5. No Tech Allowed Initially: Start with a low-tech approach. Avoid laptops and other distractions to keep the focus on the collaborative mapping process.
6. Visualize Everything: Make the process visual. Use different colors for different types of notes (e.g., events, commands, policies) to make the map easy to read.
7. Avoid Premature Solutions: Don’t jump to solutions too quickly. Focus on understanding the problem space thoroughly before discussing solutions.
8. Respect All Contributions: Value and respect all contributions, regardless of the contributor’s role or level of expertise.
9. Iterative Approach: Event Storming is iterative. Be prepared to revisit and refine elements as new information and insights emerge.
10. Use Facilitators: Having a facilitator can help guide the session, keep discussions on track, and ensure that everyone’s voice is heard.

## Additional Resources

These two articles, written by Alberto Brandolini, the inventor of Event Storming, about remote sessions is basically a "must read":

- [Remote Event Storming Part I: It sucks It’s complicated](https://blog.avanscoperta.it/2020/03/26/remote-eventstorming/?utm_source=blog&utm_medium=post&utm_campaign=remote_eventstorming)
- [Remote Event Storming Part II: EventStorming in COVID-19 times](https://blog.avanscoperta.it/2020/03/26/eventstorming-in-covid-19-times/?utm_source=blog&utm_medium=post&utm_campaign=remote_eventstorming)

Useful links and books about the topic.

- https://www.funretrospectives.com/category/energizer/
- https://www.eventstormingjournal.com/
- [How to use Event Storming with Legacy Systems](https://www.eventstormingjournal.com/big%20picture/read-this-before-applying-big-picture-event-storming-to-legacy-systems/)
- [Big Picture Event Storming](https://medium.com/@chatuev/big-picture-event-storming-7a1fe18ffabb)
