---
layout: post
title: Why is Open Source more agile in fixing bugs?
categories: software-architecture
tags: software-architecture
draft: true
comments: true
---

When Oracle, Microsoft or Apple needs weeks to fix things or has a fixed schedule for patch releases, a lot people like to make fun about those companies. Some are even going that far to call those companies incompetent. I do not think that this is reasonable and justified.

As somebody who contributed to an open source PHP framework ([CakePHP](https://cakephp.org)) and worked in a bigger company I know both sides and would like to shed some light on it.

The pros and cons in the text target the time to delivery, flexibility and accountability of both entities. The goal is to compare reasons of why they have the slow or fast delivery times they have.

## How Open Source Projects handle Issues

**Disclaimer:** Open Source projects are highly diverse in their size of the code base, the number of team members and their activity. Please **do not** assume that this section of the article is meant to reflect the reality of *all* open source projects! Consider the diagram and text here therefore as a very abstract interpretation that tries to cover a very diverse group.

* **Pros**
  * Larger open source projects are usually driven by one or a few strong leaders.
  * Smaller open source projects consist sometimes of only one or a few people.
  * No contractual obligations
* **Cons**
  * The limiting factor of an open source project is mostly the available free time of the contributors.

An open source project has no legal risks at all if the patch that it released screwed something completely up. The worst it has to fear is a loss of reputation, which is not really that important if you are one of the corner stones for something, like OpenSSL ([Heartbleed](https://heartbleed.com/) anyone?) or Log4j ([Log4Shell](https://en.wikipedia.org/wiki/Log4Shell) bug?).

There are usually no legal agreements like contracts and SLAs with open source projects, because most use a license that excludes any liability. With some luck there is a commercial entity behind or aligned with the open source project that provides services, but then we are not speaking any longer about an open source project, but a service provider. 

If an open source project decides to release a security patch it doesn't have to worry about the case that things are blowing up somewhere in the system of the user of the project. Sure, it will impact reputation but realistically, most, if not all, users won't switch the project if this is not going to happen recurring.

![Graph Example Diagram](/assets/images/oss-issue-workflow.png){: style="display: block; margin: auto;"}

## How a bigger companies handle Issues

Companies face several problems and restrictions that an open source project doesn't have.

* **Pros**
  * None
* **Cons**
  * Bureaucracy, process overhead
  * Lots of people involved, cross department dependencies
  * Lack of resources (people)
  * Priorities based on business value
  * Sick leaves/vacations
  * Contractual obligations
  * SOC2, ISO 27001...

A company with a long chain of communication, between multi people and teams, will never be able to react as fast as an open source project that doesn't have all of those structures.

![Graph Example Diagram](/assets/images/cs-issue-workflow.png){: style="display: block; margin: auto;"}

## Bottom line

Like it or not, but the reality is that probably most, if not all companies that reached a certain size, will become slower in handling anything.

This is due to the size of the company and the internal processes and how we humans are organizing our structure and where our communicative and cognitive limits are. Keep in mind that the most small effective unit is a team of ~5-7 people working as a team.

Now imagine that you have a company with thousands of software components. The security team needs to find the responsible department or and and talk to them. This team needs to have time to take the task and might be forced, depending on the severity of the issue, to shuffle their entire sprint. This might impact business goals and we are in the political arena: The business cares about business value, money. If you have to finish a feature to close a deal or to make your investor happy, you won't take a security issue that has a remediation time of 60 days as a priority over finishing your feature. Of course there is a risk that needs to be accepted by the responsible person.
