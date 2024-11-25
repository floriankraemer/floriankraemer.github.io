---
layout: post
title: What is Software Architecture?
categories: software-architecture
tags: software-architecture
draft: true
published: false
comments: true
---

It is not only that I sometimes have to explain what I do beyond "Something with computers", but there is also a justified question in what a software architect does for different stakeholders. In this post, I will try to explain what software architecture is.

## Attempts of Definition

> "*Software architecture is the set of structures needed to reason about a software system and the discipline of creating such structures and systems. Each structure comprises software elements, relations among them, and properties of both elements and relations*" - Clements, Paul; Felix Bachmann; Len Bass; David Garlan; James Ivers; Reed Little; Paulo Merson; Robert Nord; Judith Stafford (2010). [Documenting Software Architectures: Views and Beyond, Second Edition](https://www.amazon.de/dp/0321552687).



> "*Every system has an architecture, but an architecture is not a system; an architecture and an architecture description are not the same thing; architecture standards, descriptions, and development processes can differ and be developed separately; architecture descriptions are inherently multiviewed; and separating the concept of an object's view from its specification is an effective way to write architecture description standards.*" - [Software architecture: introducing IEEE Standard 1471](https://ieeexplore.ieee.org/document/917550)

This is a very clear description provided by the IEEE. However, it is not easy to understand for non-technical people.

> "*A system is a whole that consists of parts, each of which can affect its behavior and properties. ... Each part of the system is dependent on some other part.*" - [Russel L. Ackoff](https://en.wikipedia.org/wiki/Russell_L._Ackoff)

I think it is fair to say that software architecture is the study of the structure and behavior of software systems following the above description of a system.

### My take on it

What all of the above descriptions have in common is that architecture is about the reasoning, structures and relationships of elements within a system. It is not about the implementation details, but about the overall design and organization of it.

## What is a Software Architect?

A software architect serves as the mediator between business interests and technology interests. Software architects must understand the needs of the business and find ways to fulfill those needs using the best possible technology, while also identifying the best compromises for the business.

Why compromise? When you talk with consultants or software architects, you will often hear the phrase “it depends.” This is because it truly depends on several factors that fulfill different criteria, which are often contradictory by nature. Security is a good example; it often introduces additional complexity and costs.

For instance, you would hopefully ensure that a nuclear power plant or medical devices are better protected than an entertainment platform. Of course, the entertainment platform must meet certain criteria as well, such as GDPR compliance. However, I think we can agree that if a nuclear power plant experiences a critical failure, the consequences are far more severe than if an online streaming service is down for 50 minutes or if some credit card data is lost. While losing credit card data is not ideal, it does not have the same dramatic consequences.

Thus, the job of a software architect is to find the best balance between business and technology interests. You will often encounter situations where you must choose a suboptimal solution because the circumstances make this option the most feasible, even if it is not the best technology-wise. Ultimately, it's a trade-off.

While software architects should strive for perfection, they also need to be realistic and pragmatic. You must be able to find not only the best solution but also alternative solutions that best match the given circumstances. You can choose whatever technology you want, but if your company lacks personnel familiar with that technology, you must consider the time and costs associated with training them. If an alternative technology that is already known within your company is available, even if it performs slightly less effectively, it might still be a better match if you need it implemented quickly. Furthermore, even for long-term use, it might be a better solution, as the investment in training personnel could lead to a significant advantage in adopting that new technology over time.
