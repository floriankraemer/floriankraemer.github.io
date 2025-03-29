---
layout: post
title: "Documentation - You think its boring?"
categories: software-architecture
tags: software-architecture, documentation
draft: false
comments: true
---

Is this article will try to give you an overview of the different types of documentations For whom they are useful and should be written for and provide you some tips and tricks what you could do to write better documentation.

Let's start with one of the biggest false claims I've seen: Self documenting code. After that we'll look at different types of documentation and stakeholders and their needs.

## "Self-documenting code" is a big Lie

The so-called "self-documenting code" is very often, if not always, a big lie or an excuse when people knowingly use it to justify the absence of proper documentation.

For code to be truly self-explanatory, it would have to be very expressive, highly decoupled, and well-named. Take a moment to reflect on that sentence. How often do you see code that actually reflects the ubiquitous language of the business, and how often is the domain model well-separated from the actual frameworks surrounding it? We are essentially talking about clean architecture, clean code, and applying the ubiquitous language. In reality, this is not very common.

How is code supposed to document the actual requirements of your infrastructure and non-functional requirements? How does it document the decisions that led to its existence and structure? Code exists within the solution space, solving problems from the problem space that comes from the business, not technology. So how can code reflect any of that?

Code can be highly readable and understandable, but that doesn't mean it is documented. Readable code makes it easier to understand but does not replace documentation. In good faith, I assume that when people talk about self-documenting code, this is actually what they mean.

Do this if you want to validate if your code is "self documenting": If your non-technical stakeholders, such as your product owner, can read your code and tests, understand them, and see that they match their requirements based on the language used, then you have achieved very clean code.

But that still doesn’t mean it is documented.

## Types of Documentation

Developers often think of documentation as either "doc blocks," inline comments, or, at best, some documents stored in the repository.

But there are different types of documentation, each targeting different audiences and serving different purposes. Not every stakeholder is interested in the same type of documentation. Some documentation requires ongoing maintenance, while others can be discarded after serving their purpose.

### Architectural Documentation

Architectural documentation provides a comprehensive overview of the system's structure, components, and interactions. It outlines the design decisions, patterns, and principles guiding software architecture. This documentation serves as a roadmap for developers, helping them implement and maintain the system. It typically includes architectural diagrams, component descriptions, design rationale, and key interfaces.

There are different "views" of the system, such as high-level diagrams that show the overall system architecture and deployment or infrastructure-related views that explain how the application is deployed within its environment.

C4 and Arc42 are two common ways of documenting architecture.

Architectural documents are usually long-lived and should be maintained by architects to reflect the system's current state.

### Architectural Decision Records (ADRs)

How often have you asked yourself, "Why was this ever done like this?" Well, there might have been a time when the decision that seems bad today was actually a good one. The system may have evolved, but without proper refactoring and adaptation. An ADR provides historical context and may even document alternative approaches that could be applied today.

ADRs capture important architectural decisions along with their context and rationale. They help teams track why certain choices were made, ensuring continuity and shared understanding over time. ADRs typically follow a structured format, including the decision, its reasoning, alternatives considered, and consequences.

By maintaining ADRs, teams improve knowledge sharing, facilitate future refactoring, and avoid revisiting past decisions unnecessarily. They are especially useful in complex, long-lived projects where architectural choices evolve with changing requirements and constraints.

### Development Documentation

Development documentation encompasses all materials necessary for software developers to understand, modify, and extend the codebase efficiently. It includes code comments, inline documentation, coding standards, and guidelines. This documentation aids developers in comprehending the logic behind the code, its intended functionality, and how different modules integrate with each other. It promotes consistency, collaboration, and maintainability across the development team.

### End User Documentation

End user documentation is tailored for the system's end users, providing guidance on how to effectively use the software to accomplish their tasks. It includes user manuals, guides, tutorials, and FAQs designed to facilitate a smooth user experience. End user documentation aims to empower users with the knowledge and skills needed to leverage the software's features optimally. Clear instructions, illustrations, and examples are essential components of effective end user documentation.

### Testing Documentation

Testing documentation document the testing strategy, test cases, test plans, and test results used to verify and validate the software's functionality, performance, and reliability. It ensures that the software meets the specified requirements and quality standards before deployment.

Part of testing documentation can be the definition of SLOs as well, service level objectives. The documentation can contain also test results and reports to document an improvement or decline in quality.

Testers, developers but also other stakeholders, especially those who have an interest in quality, want to read this type of documentation.

### Release Documentation

Release documentation documents the changes, enhancements, bug fixes, and new features included in each software release. It provides release notes, version history, and upgrade instructions to help users and administrators understand what has changed and how to transition to the new version smoothly.

### Compliance Documentation

Compliance documentation ensures that the software complies with industry regulations, standards, and legal requirements. It includes certifications, audit reports, security assessments, and privacy policies that demonstrate the software's adherence to relevant compliance standards.

One of such compliance examples is GDPR or SOC2. Both require you to be compliant with certain requirements and to document that your systems or processes comply. This can be important for legal reasons or simply to get a certification.

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

Consider that the template is not complete nor necessarily complete for your specific organizations structure and roles.

### Onboarding

There's one type of user or role is missing from that table for good reason because it cannot be put into a single role, because it is generic if you need to onboard somebody for whatever role it will be it is great to have at least some overview of whatever this person will face within the next few weeks at work. The Newbie.

Even if you do not have a lot of documentation but only a very abstract and high level documentation of, for example the information flow within your system, or what services are there and how they interact with each other, it will already be very helpful for the new familiarize itself with the system.

## Measuring the impact of the (absence of) documentation

The impact of the absence of good documentation can manifest in various ways, affecting different aspects of the software development process and the product itself. However, it seems not possible to measure the impact directly, only indirect through changes in behavior of the involved people or related metrics.

Feedback from stakeholders, including developers, users, and project managers, can provide valuable insights into the impact of documentation. Surveys, interviews, and feedback forms can be used to gather qualitative data on the challenges and issues caused by inadequate documentation.

You can try to use onboarding time to productivity as a metric. Good documentation can improve the time of the onboarding for internal and external stakeholders and it is measurable. For example the time it takes a developer to create a new component confidently and with good quality can be measured. A/B testing could be done here to get an approximate idea of the impact of documentation.

## Documentation for the Management Stakeholders

The management is usually not interested in deep analysis or raw piles of data. You want to provide short but "crispy" reports, sometimes just bullet points. They are often mostly interested in the outcome of something or getting options  to choose from to enable them to make a decision

Don't bother them with lengthy tests, keep them short, precise and on point. Refer to details, data, reports if they want to take a closer look at the data they can do it, but don't overload them with it. They'll very likely mostly interested in the details when things went wrong.

## Challenges with Documentation

Documentation is not an easy topic, because there are certainly challenges to it:

* Where do we put it?
* How well will it be searchable?
* How will we structure it?
* How will be maintain it?
* What will be the cost of generating  and maintaining it?
* What could be the cost of not having it or not maintaining it?

Regarding structure my best advice would be to define a good structure that matches your needs and enforce it and stick to it. This will require a lot discipline, because there are no tools that can enforce it. The quality of the search in different tools varies a lot and the AI based search assistants were not really helpful at the time of writing this.

## Improving documentation

* Make it easy to report issues within the documentation - for everyone.
* Make it easy to improve and contribute to the documentation - for everyone.
* Link your documentation in related documents and code where it is appropriate and helpful.
* Ensure that each document has an owner who can be contacted and will take care of maintenance and who is responsible for the document.

## Recommended book

At Srpyker I was tasked as part of my job as an architect to read books and to give a presentations about them and my view on them. One of the books I've got to read is called “[Documenting Software Architectures: Views and Beyond]((https://www.amazon.de/-/en/dp/0321552687))”. When I heard the title I was a little shocked because I was thinking “Oh my god why do I get such a boring topic!”.

It turned out that the book was actually not that bad as I thought, in fact it's a great book that taught me a lot about documentation!

[![Documenting Software Architectures: Views and Beyond](/assets/images/books/documenting-software-architecture.jpg)](https://www.amazon.de/-/en/dp/0321552687)
