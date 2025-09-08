---
layout: post
title: 'Cowboy Coding - A Case Study'
categories: software-architecture
tags: 
    - software-architecture
    - project-management
    - company-culture
draft: true
published: false
comments: true
date: 2025-09-30
---

Have you heard of "Cowboy Coding" before? It is a term used to describe a very unstructured development process. The reasons for the lack of structure can be variable but at the end it is an intentional or unintentional lack of proper processes and leadership.

We will first explore what Cowboy Coding is and then continue with the findings within the organization of this case study and different ways how to address them. If you already know what Cowboy Coding is, you can skip the first part of the article.

**Note that this is not company I have been directly employed by or are currently employed by.** I'm very grateful for the permission to publish the information shared in this article. I think it is pretty clear why I will not publish the name or even industry of the organization at hand. I will also not share technical details about the technical- and [sociotechnical aspects](https://en.wikipedia.org/wiki/Sociotechnical_system) of the organization, because it might be possible to somehow guess what it is about.

## What is Cowboy Coding

Cowboy” as a [pejorative](https://en.wikipedia.org/wiki/Pejorative) in the context of being reckless/unreliable (e.g., “cowboy builder”) has been around for decades — the sense “reckless, not following rules” is way older than computing.

https://en.wikipedia.org/wiki/Cowboy?utm_source=chatgpt.com#cite_note-linder2005-15

The phrase “cowboy coding” seems to have entered tech slang at least by the mid-2000s. The earliest clear usage I could find is 2007. The term appears in a blog post dated January 11, 2007, titled “Delving into Cowboy Programming” (noting that "cowboy coding" is used interchangeably with "cowboy programming"). The author describes it as:

> a form of software development method without an actual defined method – team members do whatever they feel is right.

According to Wikipedia it is...

> ...software development where programmers have autonomy over the development process. This includes control of the project's schedule, languages, algorithms, tools, frameworks and coding style. Typically, little to no coordination exists with other developers or stakeholders.

I agree mostly with the definition from Wikipedia, but I would like to put some emphasis on the reason behind the autonomy. Are they doing that intentionally or not? Do they actually really have control over the process? Maybe there is also just a lack of leadership and they just free-roam because of a lack of direction? On the other hand, Cowboy Coding can be useful for prototyping and research and development. If the prove of the idea matters and not the delivered quality, it can be a good option.

## Problems of Cowboy Coding

Wikipedia is listing four different problem areas for Cowboy Coding:

### Lack of release structure

> Lack of estimation or implementation planning might cause a project to be delayed. Sudden deadlines or pushes to release software may encourage the use of "quick and dirty" techniques that will require further attention later.

### Inexperienced developers

> Cowboy coding can be common at the hobbyist or student level where developers might initially be unfamiliar with the technologies, such as testing, version control and/or build tools, usually more than just the basic coding a software project requires.
>
> This can result in underestimating time required for learning, causing delays in the development process. Inexperience might also lead to disregard of accepted standards, making the project source difficult to read or causing conflicts between the semantics of the language constructs and the result of their output.

### Uncertain design requirements

> Custom software applications, even when using a proven development cycle, can experience problems with the client concerning requirements. Cowboy coding can accentuate this problem by not scaling the requirements to a reasonable timeline, and might result in unused or unusable components being created before the project is finished.
>
> Similarly, projects with less tangible clients (often experimental projects, see independent game development) could begin with code and never a formal analysis of the design requirements. Lack of design analysis could lead to incorrect or insufficient technology choices, possibly requiring the developer to port or rewrite their software in order for the project to be completed.

### Incompleteness

> Many software development models, such as Extreme Programming, use an incremental approach which stresses that the software must be releasable at the end of each iteration. Non-managed projects may have few unit tests or working iterations, leaving an incomplete project unusable. As such, agile methodologies have been compared to cowboy coding but agile has formal processes, procedures, measurement, project management and other oversight while cowboy coding has none of this.

## (Claimed) Advantages of Cowboy Coding

On the Wikipedia page, four points are listed that describe advantages of this approach:

> 1. Developers maintain a free-form working environment that may encourage experimentation, learning,  and free distribution of results.
> 2. It allows developers to cross architectural and/or tiered boundaries to resolve design limitations and defects.
> 3. As discussing architectures, writing specifications and reviewing the code all take their time, a single developer (if sufficient) may well produce a working application faster by cowboy coding. Tasks like research or prototyping may not require the code quality more complex methods provide.
> 4. Since coding can be done during the developer's free time, a project could come to fruition which otherwise wouldn't have.

### Why I do not think they are valid

Mostly because the advantages being described are rarely manifest in reality.

The first one only applies if you have _intrinsically highly motivated autodidacts that are beyond junior level and capable of self-organization_, communication and alignment in their team and with other teams. Nothing of this is currently present in the organization of this case study.

The second is simply a gate to total chaos, an invitation to ignore everything. The third as well, if it goes beyond the proof of concepts and prototyping or really trivial things. This might be an approach for short-term, small “throw-away” pieces of code, but not for a sustainable, maintainable product.

As mentioned already by prototyping, it can in fact make sense to have such a free roaming development team if its only purpose is to create quick and dirty proof of concepts and prototypes. The results should then be either thrown away and properly rebuilt or, if economically feasible, refactored to match a high quality.

As for the fourth, it doesn’t specify where the boundary lies or whether that's really the intended purpose to have people working on features in their free time. There are also legal, mostly copyright, and work-time questions regarding number four.

## Findings within the Organization

Some of the observations made above are visible in workshops and retrospective meetings. Many of the problems mentioned there appear not the first time, according to some of the stakeholders.

Because the organization did not record any metrics, it is hard to provide quantitative data to support the observations, which itself is one of the problematic points.

### 1. Technical Leadership & Excellence

- Tech Leads are not demonstrating strong technical leadership or driving excellence.
  - Code reviews do not address violations of SOLID principles or general code quality issues, despite such issues being prevalent.
  - No proactive sharing of learning resources, identification of structural issues, or meaningful contributions to documentation.

### 2. Alignment Between Product & Technology

- Significant disconnect between technical implementation and product management.
- Absence of a Product Owner (or equivalent role) and a maintained backlog.
- Minimal to no recording of technical debt or improvement initiatives in ticketing systems, preventing prioritization and planning.
- Lack of structured refactoring efforts, increasing the risk of long-term quality degradation.

### 3. Motivation & Skills Development

- Teams show limited intrinsic motivation or initiative to improve processes and skills.
- No observable self-driven improvements in the past ~8 months; improvements occur only when enforced by C-level.
- Lack of a culture of continuous learning or upskilling.

### 4. Leadership Model & Authority

- The current laissez-faire approach is ineffective without skilled, motivated individuals.
- Absence of metrics (e.g., DORA) to quantify performance.
- C-level intervention is often required for essential processes to occur.
- No clear authority for directives between developers and C-level; issues escalate directly to C-level.

### 5. Team Composition & Skill Levels

- Skewed distribution toward junior developers; insufficient senior developers to mentor and lead by example.
- Overall skill levels are below expectations:
  - Weak object-oriented design skills
  - Poor or absent testing practices
  - Limited planning and communication skills
  - Insufficient systems thinking

### 6. Responsibilities & Ownership

- Unclear ownership of tasks and deliverables, leading to confusion and inefficiency.

### 7. Communication Issues

- Communication breakdowns across all levels, including C-level:
  - Slow or absent responses, sometimes spanning days
  - Ignored messages
  - Poor calendar usage, complicating scheduling
  - Critical discussions happening in private channels, reducing transparency and information sharing

### 8. Cultural & Motivational Environment

- Environment allows low-motivation individuals to persist without improvement, likely due to resistance to change.
- Structural issues frustrate higher-performing individuals, negatively impacting their motivation.
- Multiple team members report dissatisfaction with leadership, direction, and various points already listed.

### 9. Misuse of AI

- Some individuals use AI tools without fully understanding the underlying problems or context, leading to over-reliance on inaccurate results.
- Effective AI use requires clear problem definition and contextual understanding, which is currently lacking.

## Assessment

The organization as a whole has still a culture of a very small business (3-5 people developers) when it comes to professional software development with all the problems that growth and professionalism brings to the table when a development department grows. All of this fits the profile of a team that is still operating as if it were in its early startup phase, even though its size and ambitions demand the structures and disciplines of a professional engineering organization.

People and organizations of a certain size are no longer capable of organizing them self organically, especially when there is a lack of skills. The proposal is not to introduce unnecessary bureaucracy but processes that _steer_ the development and organization towards delivering quality fast, which means a reduction in cost.

The organization urgently needs to make a decision if it wants to stick to the habits of a small business and put the “employee happiness” of people who lack a professional mindset over productivity and the cost this has.

## Proposed Options

As one of my mentors a few years back said, "It is your job to provide the management with options", and I fully agree on that. There is in this case also a large social component, because not only technology will be impacted by the different options.

### Context

To be able to understand the proposed changes it is of course required to understand the situation and context.

We are talking here about 3-5 development teams, depending on how they are currently composed and a big ball of mud architecture, which is something that should not be surprising if you read the assessment. Because of that quality of the delivered product is often impacted and the development speed is often slow.

One of the primary investors is ready to provide additional funding to improve the development speed, because his opinion is that the development is too slow and therefore too expensive. Given the risk of losing a potential big investor the different options being discussed later on had to be delivered very quickly.

### 1# Change the Culture and up-skill the Developers

The goal here is to keep most of the people in place and make changes to the organizations structure and culture while at the same time upskilling existing staff, to not have to replace anyone.

| Priority | Proposed Action | Expected Effect on the Business |
| :---- | :---- | :---- |
| ASAP, within days | In general push for more accountability and responsibility with consequences. Hold people accountable. | Better quality, more attention to details. This might impact the happiness of some people which should not be an argument here for business reasons. |
| ASAP, within days | Introduce a clear definition with responsibilities for each role. Introducing a RACI-matric to clarify and organize roles. Clarify the ownership of components in the system, document it. | Clarifying roles and responsibilities will stop discussions about who needs to do what and put emphasis on responsibilities and accountability. |
| Within 3 Month | The number of developers and speed and output doesn’t match: Get rid of the lowest performers as soon as possible. The average skill level is way too low, hire experienced senior developers to get a more equally distributed skill level from junior to expert. Right now there are way too many juniors by skill, not by the time being a developer. If the speed and quality is acceptable for the management, remove the low performers as well and replace them by cheaper offshore resources that will deliver the same level of quality for less money. | Reduced cost, increased development speed and quality, or if the offshore option is chosen at least reduced cost. |
|  | Introduce the SPACE framework to measure developer happiness. |  |
| Within 3 weeks. | Introduce the DORA metrics to be able to actually: Compare the organization's performance to other teams from the thousands of samples provided by the DORA report to get a realistic comparison. Observe the impact of changes made to the development process. | The business should be able to objectively tell if measures it took had a positive or negative impact. |
| Within 3 Month | Hire experienced technical leads or train motivated people to be able to fulfill that role. Hiring should be preferred because training a person will probably take much longer. | Better quality delivered and ongoing knowledge transfer and growth of skills within the teams. |
| Within 6 weeks ASAP | Push **mandatory** training on the development staff for these: Testing Coupling & Cohesion OOP and SOLID Communicate that the expectation is that people will apply what they’ve learned and a change in quality and mindset is expected and will be monitored. | Higher quality, faster development speed mid- to long term. |
| Within 1 Month, ASAP | Get a person (existing or hired) to fulfill the tasks of what commonly is called a "Product Owner”. | Better planning and prioritization will contribute to a more streamlined development process and should increase the speed of delivering business value, while also controlling the unregulated growth of tech debt. |
| ASAP, within days | Give the Enablement Team the authority to push changes on the development teams that must be followed. | Quicker decisions. |
| ASAP | Get a change management consultant that helps steer the organization through the transformational process. |  |

Some people might leave the company on their own because of the cultural shift, but those are the people who the company should better get rid off anyway, because these are the “Cowboy Coders” by trade. Some people might have to be laid off, if they won’t follow the direction given by the management and push towards education and quality enhancements.

On the other hand, some people of different skill levels are already not happy. The effect on sticking to the status quo will be that the organization will lose the higher skilled people. Therefore the organization is in any case already at risk of losing people. Depending on the choice the business makes it will either lose skilled or unskilled workers mid- to long term.

### #2 Build a new Development Team, refactor the existing System

Hire very skilled developers, 5-6
Proven TDD & SOLID skills are a hard requirement
A good tech lead
A good product owner
Start to measure things, e.g. DORA to figure out how we perform
This team will work exclusively on migrating existing functionality and creating new functionality in the already planned new architecture.
Hiring those people will require time, this is probably hard to do within less than 3-6 months to get the whole team together.
First results should probably not be expected in less than 6 - 10 months.

This is basically the plan we currently have but with a highly skilled team that will do the work on the new implementation that we plan to do with the modular monolith architecture.

The unknown and hard part here is to decide which parts will be implemented when in the new system. Given the entanglement of the existing code base down to the DB layer makes it extremely difficult to estimate anything. For each migration step to the new architecture we will have to implement an “anti-corruption layer” between the new and old system, to keep the new architecture clean but to connect to the old components.

A so-called “big bang release” is highly unlikely to be a good option. This would require it to basically build everything from scratch, which is not easy to predict at all. This can be something in between 12 and 24 months.

### #3 Restart the whole Product with a new Development Team

This option was actually proposed by the investor and triggered the whole evaluation.

Hire very skilled developers, 5-6
Proven TDD & SOLID skills are a hard requirement
A good tech lead
A good product owner
Start to measure things, e.g. DORA to figure out how we perform
Let the existing CMH team continue to work as it is and put the product in maintenance mode.
Create a complete new iteration of the product from the ground up
It will have to connect with EQ-Data
It will have to connect with the Cockpit
The Cockpit application will require changes as well.
When the new product becomes available, fade out the old version
It then needs to be evaluated if and who of the old team is still needed.

This will have a severe impact on the morale and lives of a lot of the impacted staff as soon as the new product iteration is ready.

### Caveats

* Hiring new qualified developers will take time.
* To form a well functioning team, even with skilled individuals will take time.
* Whatever options are chosen, there will be a startup phase, in which processes and people will have to align and start working together as intended.
* None of the solutions will have a “kickstart” like effect that might be expected by the investor.
* If and how quickly any of them becomes a reality is also highly dependent on how much the management is willing to change the existing culture and leadership style.

## Conclusion

Unfortunately, nothing concrete has been decided yet, the path the organization is going to choose is up to it but I'm very interested in the results. I might write another article about then in a few month.

Regarding Cowboy Coding as a methodology of development, my personal opinion is that the only valid use case for a Cowboy Coding approach is rapid prototyping and iteration. I really see no other use case than that for a valid application of Cowboy Coding.

You disagree? That's great! Let's have a discussion on Linked in, X or in the comment section below. I'm happy to learn about your point of view!
