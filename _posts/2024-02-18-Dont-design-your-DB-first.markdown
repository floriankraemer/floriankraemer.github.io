---
title: Don't do DB first design
layout: post
categories: software-architecture
tags: software-architecture
comments: true
draft: false
published: false
---

Recently , I read this statement and I do not think it is true.

> Data has to be well organized in DB. Business process changes, but data points associated remain almost the same.

It is in my opinion not correct, that data behind processes rarely changes, at least not in all businesses. Imagine a business that has a lot rules and conditions or has to follow ever changing laws and regulations. e.g. insurances, taxes, medical, flight, or banking stuff. Your data will change for sure and relatively often. For example if the income tax introduces a new variable or thing to be calculated, you will have to change the process and very likely the data accordingly.

The pretty complex income tax calculation here in Germany is updated every year. [See the most recent version](https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2024-01-29-PAP-2024-Enwurf.pdf). And yes, all of the diagrams belong to the same process.

If you design a DB based on the process something went horrible wrong. The DB design should be oriented on criteria like performance or if I will have a lot writes but few reads or vice versa or how a structure can be stored the best, this can be a document DB or a relational DB or N DB systems, e.g. in case of CQRS a read and a write DB.

Your domain won't care because it should not be coupled in any way to the DB. The domain actually defines the repository interface, but the implementation is in the infrastructure layer. e.g. deconstruct the aggregate using reflection and write the values via PDO to tables or map it to your favorite ORM - in your implementation, not in your domain layer.
