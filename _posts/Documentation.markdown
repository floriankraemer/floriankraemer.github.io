---
layout: post
title: "Documentation - You think its boring?"
categories: software-architecture
tags: software-architecture, documentation
---

Is this article will try to give you an overview of the different types of documentations For Whom they are useful and should be written and provide you some tips and tricks what you could do to write better documentation.

## "Self-documenting code" is a Lie

The so-called "self documenting cod"e is very often, if not always, a big lie or an excuse when people knowingly use it to justify the abundance of proper documentation.

Code that will be very self-explanatory to a very high degree would mean, that the code will have to be very expressive, very decoupled and very well named. Take a moment and reflect about that sentence. How often do you see code that actually reflects the ubiquity's language that the business is using in the code and how often is the domain model well separated from the actual frameworks surrounding it? We are basically talking about clean architecture and applying the ubiquitous language. This is in fact very rarely seen in the real world.

How is code supposed to document the actual requirements of your infrastructure and your non-functional requirements? How is code documenting the decisions that led to its existence and how it is structured? Code is within the solution space that solves problems from the problem space coming from the business and not technology, so how is code supposed to reflect any of that?

Code can have a very good readability and understandability, but that the doesn't mean it is documenting anything. It will just make the code more accessible but not really documenting it. Being good faith I assume that this is actually what most people mean when they talk about self-documenting code.

## Types of Documentation

There are all different types of documentation that target different audiences and purposes, because not every stakeholder is interested in the same type of documentation.

### Architectural Documentation

Architectural documentation provides a comprehensive overview of the system's structure, components, and interactions. It outlines the design decisions, patterns, and principles guiding the development of the software architecture. This documentation serves as a roadmap for developers, guiding them in implementing and maintaining the system. It typically includes architectural diagrams, component descriptions, design rationale, and key interfaces.

### Development Documentation

Development documentation encompasses all materials necessary for software developers to understand, modify, and extend the codebase efficiently. It includes code comments, inline documentation, coding standards, and guidelines. This documentation aids developers in comprehending the logic behind the code, its intended functionality, and how different modules integrate with each other. It promotes consistency, collaboration, and maintainability across the development team.

### End User Documentation

End user documentation is tailored for the system's end users, providing guidance on how to effectively use the software to accomplish their tasks. It includes user manuals, guides, tutorials, and FAQs designed to facilitate a smooth user experience. End user documentation aims to empower users with the knowledge and skills needed to leverage the software's features optimally. Clear instructions, illustrations, and examples are essential components of effective end user documentation.

### Testing Documentation

Testing documentation documents the testing strategy, test cases, test plans, and test results used to verify and validate the software's functionality, performance, and reliability. It ensures that the software meets the specified requirements and quality standards before deployment.

### Release Documentation

Release documentation documents the changes, enhancements, bug fixes, and new features included in each software release. It provides release notes, version history, and upgrade instructions to help users and administrators understand what has changed and how to transition to the new version smoothly.

### Compliance Documentation

Compliance documentation ensures that the software complies with industry regulations, standards, and legal requirements. It includes certifications, audit reports, security assessments, and privacy policies that demonstrate the software's adherence to relevant compliance standards.

## Different Stakeholders different Needs

Different stakeholders have different needs. The developers need to understand the code, the business needs to understand the
requirements and the DevOps or cloud team needs to understand the infrastructure. End users of your software need to understand how to use it.  The documentation needs to be targeted at the right audience.

| Role           | Architecture | Developer | Testing | End User |
|----------------|--------------|-----------|---------|----------|
| Architects     | Yes          | No        | Yes     | No       |
| Developers     | Yes          | Yes       | Yes     | No       |
| End Users      | No           | No        | No      | Yes      |
| Tech Leads     | Yes          | Yes       | Yes     | No       |
| Management     | Yes          | No        | Yes     | Yes      |
| Product Owners | Yes          | No        | Yes     | Yes      |
| Testers        | Yes          | Yes       | Yes     | No       |
| Operations     | Yes          | Yes       | Yes     | No       |

### Onboarding

There's one type of user or role is missing from that table for good reason because it cannot be put into a single role, because it is generic if you need to onboard somebody for whatever role it will be it is great to have at least some overview of whatever this person will face within the next few weeks at work. The Newbie.

Even if you do not have a lot of documentation but only a very abstract and high level documentation of, for example the information flow within your system, or what services are there and how they interact with each other, it will already be very helpful for the new familiarize itself with the system.

## Measuring the impact of the (absence of) documentation

The impact of the absence of good documentation can manifest in various ways, affecting different aspects of the software development process and the product itself. However, it seems not possible to measure the impact directly, only indirect through changes in behavior of the involved people or related metrics.

Feedback from stakeholders, including developers, users, and project managers, can provide valuable insights into the impact of documentation. Surveys, interviews, and feedback forms can be used to gather qualitative data on the challenges and issues caused by inadequate documentation.

You can try to use onboarding time to productivity as a metric. Good documentation can improve the time of the onboarding for internal and external stakeholders and it is measurable. For example the time it takes a developer to create a new component confidently and with good quality can be measured. A/B testing could be done here to get an approximate idea of the impact of documentation.

## Challenges with Documentation

* Where do we put it?
* How well will it be searchable?
* How will we structure it?
* How will be maintain it?
* What will be the cost of generating  and maintaining it?
* What could be the cost of not having it or not maintaining it?

## Improving documentation

* Make it easy to report issues within the documentation.
* Make it easy to improve and contribute to the documentation.
* Link your documentation in related documents and code.
* Ensure that each document has an owner who can be contacted and will take care of maintenance.

## Recommended book

One of my jobs I was tasked as part of my job as an architect to read books and to give presentations about my view of the book. One of the books I've got to read is called “[Documenting Software Architectures: Views and Beyond]((https://www.amazon.de/-/en/dp/0321552687))”. When I heard the title I was a little shocked because I was thinking “Oh my god why do I get such a boring topic!”.

It turned out that the book was actually not that bad as I thought, in fact it's a great book that taught me a lot about documentation!

[![Documenting Software Architectures: Views and Beyond](/assets/images/books/documenting-software-architecture.jpg)](https://www.amazon.de/-/en/dp/0321552687)