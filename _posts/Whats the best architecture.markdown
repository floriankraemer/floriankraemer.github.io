---
layout: post
title: What is the best Architecture?
categories: software-architecture
tags: software-architecture
draft: true
published: false
comments: true
---

TL;DR: If your goal is just to write better code explore the SOLID principles, learn about coupling and cohesion, TDD, "clean architecture" and "extreme programming".

Long answer: You won't build microservices solo nor gain the real experience of running them by doing so. The tricky part is to slice the system correctly and then run the system, not to build 1-2 tiny services to test and to run, well, just API calls. That doesn't give you the real experience of a microservice architecture.

You can explore every pattern and architecture. But you won't learn when and how to apply them in a real scenario by doing so. So you will learn the tech-side of things, the implementation, that is often done mostly by the developers. While I think it is great to be in touch with the code and not in an ivory tower, this isn't what you should focus on, because there is no "best", because the best one is the one that matches the vision, goals and quality attributes of the project and company.

You don't have to actually build them, you really need to understand the concept of them and the pros and cons of the architecture and its patterns. Each is made to solve certain problems. Those problems must match the business problems your software tries to solve. You are not going to do microservices for fun within a 3 people company.

Even "no architecture" can be an option: Time pressure? Low business value but a simple solution to the problem? You need it only for a few month? Do it quick and dirty (with tests), it simply does not need to be fancy, maintainable or flexible. So a "dirty" single file script might be the better solution, because this might be your best pick in this particular context.

Also, even if you decide to implement, for example, ports and adapters (aka hexagonal), you can do the actual implementation in different ways as long as you implement the ports and adapters somehow and isolate the layers properly. So just because you do it this way for you, doesn't mean you can do it the same way in another project. Especially when you have to deal with a modernization project. The thing you want to learn is why and when you would use it.

To summarize it in one sentence: The best architecture is the one that matches the business goals and quality attributes of the project, that your company can afford to implement and maintain.