---
layout: post
title: The DDD Trap
categories: software-architecture
tags: software-architecture
draft: true
published: true
comments: true
---

There are already many articles who think they talk about DDD, yes, they might do that in some way, but in a very misleading way. They usually talk only about implementation. Actually, I haven't seen many people saying they do "DDD" really doing DDD.

The problem with DDD I observed is that most people, especially developers, focus only on the tactical part of it. Which comes at the very end of the actual process. DDD is a modelling methodology, a process, not just the code and patterns, which are probably just 15% of the whole DDD story. But most people jump on just the 15%. A few comments here also confirm this observation.

## Signs that you do not really do DDD

* You do not share the same semantic language across your whole organization.
* You do not have identified and encapsulated your domain boundaries.
* You do not have multiple domains.
* You do not know the relationships between your bounded contexts.
* You have never heard terms like "ubiquitous language", "bounded context", "sub-domains" or talked about roles and responsibilities in the context of DDD.

You don't do DDD if your whole team (CTO, Managers, POs, EMs, Devs,...) can't talk in the ubiquitous language and where not involved. You have identified the bounded contexts, their relationships and can provide a proper rationale for their existence. The title of the blue book contains the sentence "Tackling complexity at the hearth of the software". The hearth is your domain and the understanding of it. DDD is about exploring and understanding processes and to create boundaries that are also a transactional boundary. It even involves team structures that should be aligned accordingly. The code is just the product of what was discovered and planned in the process before.

## Strategic vs Tactical

Now that we have talked a lot about "strategic" and "tactical" aspects lets explore in more detail what this means and what parts of DDD you are very likely completely missed.

### Strategic

The strategic part of DDD focuses on high-level architectural decisions and the organization of the domain model within the overall system. It involves defining bounded contexts, which are explicit boundaries within which a particular domain model applies. Bounded contexts help ensure that different parts of the system can have their own models and terminology without causing conflicts. Strategic DDD also involves identifying and defining aggregates, which are clusters of related objects that are treated as a single unit for data consistency purposes. This part of DDD is concerned with aligning the domain model with the business goals and ensuring a clear understanding of the system's boundaries and responsibilities.

### Tactical

The tactical part of DDD deals with the detailed design of individual domain objects and their interactions within a bounded context. It includes defining entities, value objects, and domain services, as well as specifying aggregates and repositories. Tactical DDD emphasizes capturing the domain concepts and behaviors in code effectively, often using object-oriented design principles and patterns. This part of DDD involves modeling the domain entities and their relationships, ensuring that the codebase accurately reflects the domain model's complexities and intricacies while maintaining flexibility and adaptability to changing requirements.

## So, what is DDD really then?

It is a complete modelling process that involves the whole organization if done correctly.

On GitHub there is the DDD Crew Organization that has a lot great information material regarding the process. I highly recommend you to start with the [Starter Modelling Process](https://github.com/ddd-crew/ddd-starter-modelling-process):

![DDD Process Diagram](/assets/images/ddd-starter-modelling-process-colored.png){: .align-center}

This article here will not explain the process in detail, it is about raising awareness that DDD does **not** mean start with tactical patterns and to implement only them. You start with the end of the process and miss like 85-90% of it.

## "Too many files!"

This is a complaint I've encountered multiple times.

The unjustified implementation of the patterns **is not** DDD.  First of all DDD is not about code and "tons of files", it is a modelling process. What you experienced sounds like somebody read one of the 10k articles about "tons of files" being DDD - all of those articles are not telling the truth.

The right tool for the right job: If you do mostly CRUD operations you certainly don't need DDD. In this case I agree, it is unnecessary complexity for that. But if you have to manage multiple complex domains with a lot behavior, then it is very good tool to model the domain and implement the "tons of files".

If I would be really willing to agree that there are indeed too many files, then the benefits, given there is enough complexity to justify DDD, will outnumber the negative impact:

* **Better SRP:** You'll basically forced to follow the single responsibility principle a lot more. More files but less mess in the code.
* **Expressiveness:** Your filenames and therefore classes follow the ubiquitous language. If your organization does DDD right and follows the language literally everyone should be able to understand your code briefly.
* **Maintainability:** Your domain should be isolated and very self descriptive, therefore it is easy to test and work with.

Another argument I heard is that the IDE will suggest too many files in a DDD implementation. This might be true, but you usually know what domain you work in, so it should be easy to pick the right entity from the right domain. If this is really still a problem, then you can just open the domain you work in, as a separate project. Your domain should be sufficiently decoupled from the actual framework around it, that you should be able to work within only your domain code.

You don't need DDD as a whole if you do not have the need to manage the complexity in domains and boundaries between them. You are still free to implement the tactical patterns, I think they make the code better in any case, but only if you have enough complexity.
