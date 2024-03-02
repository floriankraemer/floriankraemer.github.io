---
layout: post
title: Why don't you just replace that old thing?
categories: software-architecture
tags: software-architecture
---

Sometimes people are very eager and quick to say "Just replace X!" but don't consider the deeper implications of changing an integral part of a companies system. This article was inspired by a statement mate recently by someone stating this:

> Migrating away from COBOL is kinda expensive and risky.

The author of that statement was asked to elaborate on it. However the author did not bother to reply but I found it quiet interesting to shed some light on it. Especially because the question was seemingly asked by somebody without an IT background.

## The problem

When switching away from COBOL, you are not only switching the language but you are switching the hardware, the OS, the language, the whole architecture. You need to design, implement, test and document all of this, you need to train the involved people and hire new people. And we are talking about critical domains here, like insurances and banking processes.

If a game character floats a little over the surface in a game, because some value was not correctly rounded or the physics engine has glitches, nobody really cares that much to address this issue. But if your $1 is internally represented as 1,0000000000 in the system and becomes 0,9999999999 for some weird reason, and in the UI it is rounded to 1, there will be a big problem. This tiny fraction will accumulate over time, considering billions of transactions, this will add up quickly. And things like that happen, I know one person who unintentionally caused a very similar problem during his apprenticeship, luckily not for something critical.

While the abstraction of modern languages and infrastructure as code looks very promising on a first look, the abstraction also hides a huge amount of possible bugs in the 3rd party code you will use to build your application. If 400k lines of COBOL work fine, you don't easily replace them with 200k your team wrote but you also get 2 millions lines of 3rd party library code along that you technically own and are responsible for as the system designer and owner.

Count the lines of your projects vendor folder, no matter if its Node packages or PHP packages, you'll probably end up with a 6 or 7 digit number of lines of code for your 3rd party code. You didn't wrote it but you are now an implicit owner of that code and take responsibility for its functional correctness in the context of your project.

## Reasons to change

Why would you change a system that runs fine for 20-30 years with little effort?

* Longevity and stability of a system may not be a sufficient reason to change.
* Total Cost of Ownership (TCO) is a crucial factor in deciding to change or not.
* TCO includes the entire life cycle cost of the application.
* Justification for change often requires demonstrating increased business value, such as revenue generation or cost savings.

If you have an old computer running with Windows 3.11 in an isolated environment to control some machine and it gets its job done, why would you change it? If there is a software, that was written back in the day for that system and it still works fine for your current days requirements, why would you change it?

The so called "total cost of ownership" (TCO) of that system is just awesome if it still works. TCO means all the cost of the whole life cycle of the application. If it works and you don't have a very good reason to change (e.g. the new system will generate more revenue for some reason) you don't change it. The reality for a business is that it must justify "business value" for a change in a system.

Each time I proposed a change to the architecture in one of my jobs, part of the analysis had to be either, the impact of not doing it on the business (risks, e.g. increasing cost over time, scalability issues, security,...) or a benefit like being able to deliver code, features, faster. "If we change X developers can write code X faster and we will save X amount of money". It's all about money in many businesses, not about the ultimately perfect solution.

> The result achieved by the 300 IBM programmers, analysts, engineers, and subcontractors was impressive. An analysis accomplished after the Challenger accident showed that the IBM-developed PASS software had a latent defect rate of just 0.11 errors per 1,000 lines of code for all intents and purposes, it was considered error-free. But this remarkable achievement did not come easily or cheap.
> 
> In an industry where the average line of code cost the government (at the time of the report) approximately $50 (written, documented, and tested), the Primary Avionics System Software cost NASA slightly over $1,000 per line. A total of $500 million was paid to IBM for the initial development and support of PASS.22

[Source](https://www.nasa.gov/history/sts1/pages/computer.html#:~:text=In%20an%20industry%20where%20the,slightly%20over%20%241%2C000%20per%20line).
