---
layout: post
title: The DDD Trap
categories: software-architecture
tags: software-architecture
draft: false
comments: true
---

This article tries to address an observation I've made, that there are many articles, at least in the PHP world, that claim to be DDD, but that most of those articles actually miss 85% or more of what DDD really is: the modeling process. The code part that most articles talk about is the implementation of a long process that happened before, and it is never mentioned in those articles.

Actually, I haven't seen many people saying they do "DDD" really doing DDD. The motivation of this article is to educate people about DDD as a whole and to address disappointments with DDD that often result from misunderstandings caused by those articles.

## Signs that you do not do DDD

Lets start by identifying when you very likely are not doing DDD or misunderstood it. A few indicators for that might these:

* You do not share the same semantic language across your whole organization, the ubiquitous language.
* You do not have identified and encapsulated your domain boundaries.
* You do not know the relationships between your bounded contexts.
* You have never heard terms like "ubiquitous language", "bounded context", "sub-domains" or talked about roles and responsibilities in the context of DDD.

You don't do DDD if your whole team (CTO, Managers, POs, EMs, Devs, ...) can't talk in the ubiquitous language and were not involved. You have identified the bounded contexts, their relationships and can provide a proper rationale for their existence. The title of the blue book contains the sentence "Tackling complexity at the hearth of heart software". The hearth is your domain and your understanding of it.

DDD is about exploring and understanding processes and creating boundaries that are also a transactional boundary. It even involves team structures that should be aligned accordingly. The code is just the product of what was discovered and planned in the process before.

## Strategic vs Tactical

Now that we have talked a lot about "strategic" and "tactical" aspects lets explore in more detail what this means and what parts of DDD you are very likely completely missed.

### Strategic

The strategic part of DDD focuses on high-level architectural decisions and the organization of the domain model within the overall system. It involves defining bounded contexts, which are explicit boundaries within which a particular domain model applies. Bounded contexts help ensure that different parts of the system can have their own models and terminology without causing conflicts. Strategic DDD also involves identifying and defining aggregates, which are clusters of related objects that are treated as a single unit for data consistency purposes. This part of DDD is concerned with aligning the domain model with the business goals and ensuring a clear understanding of the system's boundaries and responsibilities.

### Tactical

The tactical part of DDD deals with the detailed design of individual domain objects and their interactions within a bounded context. It includes defining entities, value objects, and domain services, as well as specifying aggregates and repositories. Tactical DDD emphasizes capturing the domain concepts and behaviors in code effectively, often using object-oriented design principles and patterns. This part of DDD involves modeling the domain entities and their relationships, ensuring that the codebase accurately reflects the domain model's complexities and intricacies while maintaining flexibility and adaptability to changing requirements.

## What is DDD then?

It is a complete **modelling process** that involves the whole organization if done correctly.

On GitHub there is the DDD Crew Organization that has a lot great information material regarding the process. I highly recommend you to start with the [Starter Modelling Process](https://github.com/ddd-crew/ddd-starter-modelling-process):

![DDD Process Diagram](/assets/images/ddd-starter-modelling-process-colored.png){: .align-center}

This article here will not explain the process in detail, it is about raising awareness that DDD does **not** mean start with tactical patterns and to implement only them. You start with the end of the process and miss like 85-90% of it.

## "There are too many files!"

This is a complaint I've encountered many times.

The unjustified implementation of the patterns is not DDD. The right tool for the right job: If you do mostly CRUD operations you certainly don't need DDD. In this case, I agree, it is unnecessary complexity for that. But if you have to manage multiple complex domains with a lot of behavior, then it is a very good tool to model the domain and implement "tons of files".

If I was really willing to agree that there are indeed too many files, then the benefits, given there is enough complexity to justify DDD, will outnumber the negative impact:

* **Better SRP:** You'll basically be forced to follow the single responsibility principle a lot more. More files but less mess in the code.
* **Expressiveness:** Your filenames and, therefore, classes follow the ubiquitous language. If your organization does DDD right and follows the language, literally everyone should be able to understand your code briefly.
* **Maintainability:** Your domain should be isolated and very self-descriptive, therefore so it is easy to test and work with.

Another argument I heard is that the IDE will suggest too many files in a DDD implementation. This might be true, but you usually know what domain you work in, so it should be easy to pick the right entity from the right domain. If this is really still a problem, then you can just open the domain you work in, as a separate project. Your domain should be sufficiently decoupled from the current framework around it, that you should be able to work within only your domain code.

You don't need DDD as a whole if you do not have the need to manage the complexity of domains and boundaries between them. You are still free to implement the tactical patterns. I think they make the code better in any case, but only if you have enough complexity.

## The inconvenient truth

The inconvenient truth is that you won't do nor learn the essence of DDD by just following those articles that tell you to implement the tactical patterns. In my opinion DDD provides a great way to understand a business and to define the bounded contexts. Of course you are free to apply just the tactical patterns but they might not live up to your expectations if you use them for simple domain.

If you really want to get into it I recommend you to read those books. Especially the blue book is not an easy read and most people never read the whole book.

[![Validation through the Layers Diagram](/assets/images/books/ddd-distilled.jpg)](https://www.amazon.de/-/en/dp/0134434420){: .center-image } [![Implementing Domain-Driven Design](/assets/images/books/implementing-ddd.jpg)](https://www.amazon.de/-/en/dp/0321834577){: .center-image } [![Domain-Driven Design: Tackling Complexity in the Heart of Software](/assets/images/books/ddd-eric-evans.jpg)](https://www.amazon.de/-/en/dp/0321125215){: .center-image }
