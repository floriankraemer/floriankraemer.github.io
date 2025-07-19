After ~22 years of professional experience, having reviewed code of other companies, passed my knowledge happily on to other developers and tech leads, I would like to share an observations with you: I think the way programming is taught is flawed.

After I started writing this article I came across this amazing quote on Twitter/X:

![Quote from Oliver Zihler](/assets/images/screenshots/oliver-zihler-quote.jpg){: .align-center}

I totally agree with that and I would hire someone with that understanding and knowledge always over somebody who is proficient in a specific tech stack, because they'll be able to adept quickly.

## What is a coder, a programmer or an engineer?

There is also the derogative term "Code Monkey", which I don't like - but to be honest - have used, because everyone knows what problem is addressed by it: Someone who you need to give structured information, who won't be able to deliver satisfying results without being provided a specification or class diagrams.

There are quiet a few topics which I think need to be addressed when educating someone to be a good, professional software developer. Just being able to write code is not enough. Almost everyone in the industrial nations can write, but not everyone will be able to write a best seller or poems. It is the same with code. Just because someone can write code doesn't make him or her a developer.

Here are the points I think that are not taught at all or deep enough:

* Coupling & Cohesion
* Communication
* SOLID principles
  * A lot more principles
* Refactoring
* System Thinking
* Saying "No"

## Coupling & Cohesion

At least for me, coupling and cohesion are the fundamental problems of software development. Everything else is just a tool or methodology to address those two.

Cohesion refers to how closely related the responsibilities and internal elements of a module are. A highly cohesive module has a clear, focused purpose, with all its parts working together to perform a single task. This makes the module easier to understand, maintain, and reuse. For example, a UserService that exclusively handles user-related operations demonstrates high cohesion by keeping related logic together.

Coupling, on the other hand, describes the degree of dependency between modules. Low coupling means that modules are independent and communicate through well-defined interfaces, without relying on each other’s internal implementation details. This separation enhances modularity, flexibility, and ease of change. For instance, if a PaymentService interacts with an OrderService using an interface rather than directly accessing its internals, the design achieves low coupling.

Software metrics, principles like the SOLID principles are tools to address those two. But without understanding the fundamental problems it won't be obvious of why one would need something like SOLID or software metrics.

Therefore coupling and cohesion should be taught very early one and an emphasis put on the severity of understanding that they are fundamental.

## Communication

Lets define first what "communication" means in that context: Being able to express a problem clearly, precise on point in verbal and written communication. Written here means to be able to write down a short but well written assessment of an issue for example.

## Refactoring

Software ages and degrades inevitable.

An organization needs to be aware of the problem and foster a culture of constant refactoring to work against the clock. There will be a degradation of the systems quality nonetheless, for sometimes good reasons. Like when Corona happened many businesses had to really quickly rush for exploring new ideas or concepts because their business was at the brink of crashing because it depends on things that were no longer possible, for example live events, venues, sport events etc.

But being aware of the problem is just one side of the coin. An organziation not only needs to be aware of it, it then also needs people who have understood the importance of it and are capable and willing of doing constant small refactorings when working with the code.

TODO: Explain Code Katas

## System Thinking

This definition has been taken from [Wikipedia](https://en.wikipedia.org/wiki/Systems_thinking):

> Systems thinking is a way of making sense of the complexity of the world by looking at it in terms of wholes and relationships rather than by splitting it down into its parts. It has been used as a way of exploring and developing effective action in complex contexts, enabling systems change.

## Saying No

So why is saying "No" important? To ensure quality. Robert C. Martin once also said that this is a very important skill.

I doubt that it is as prevailing as in the IT industry that things get rushed and quality thrown aboard when somebody pressures to deliver something.

For the sake of the business and the long term security of your job, it might be a very good idea of saying sometimes simply "No! We can't do this because...".

Of course it is not enough to say "No", there should be a good reason that can be understood by those in charge. A rationale must be provided and most of the time money will get your attention by the audience that you need to communicate this to.

Especially if you know that things are going to crash and escalate, it might be a good idea to do a risk assessment and pass it around and make the person in charge to sign it.

It can be OK to take risks, but usually it is not the responsibility and pay grade of developers to make this decision, but they should be able to raise concerns, saying "no" and to provide a good reason why things might turn out bad.

Keep in mind that when things go wrong people might get back to you and blame you! So this is also a good way of protecting yourself.

------

*To be very clear, right from the beginning: I'm not blaming anyone for anything on this article!* The goal of the article is to hopefully trigger a discussion that leads to some actions and results.

## Has the software industry an education problem?

Why do we encounter recurrently whole teams that have never heard of certain concepts that aren't often even overly complex when explained properly?

Why do universities favour often very abstract things over real-world, everyday programming techniques and problems that would improve the ability to write high quality code on their own? Why do we have graduates who have never heard about the SOLID principles? Especially when there are studies [1][2] in computer science that prove them to be valuable.

## Has the software industry a problem?

We have to consider that the software industry, or to be more specific, software engineering is a very young discipline compared to classic mechanical engineering and (building) architecture. Therefore we don't have the decades and centuries of experience other professions already gained. On the other hand, software is today as ubiquitous as cars, mobile phones and other goods of our daily live, which are meanwhile almost all running software.

What does engineering actually means? Engineering is the application and practical use of science. It is the result of research and discoveries that lead to knowledge or concrete artifacts that can be used as a commodity in engineering.

Despite being a young but ubiquitous profession, there has already been done a lot of research in the area of computer science. We already know a lot things on how to build software or how software should be built, tested and deployed.

So is there a problem with knowledge transfer? Does the academic field when it trains new students have a completely different perception of the reality of what is going on in the real world? Are companies aware of that?

The following areas are usually the ones with the biggest deficits:

* [System Thinking](https://en.wikipedia.org/wiki/Systems_thinking)
* Testing
* Refactoring
* Design Principles (like SOLID)
* Design Patterns

Why is that so?

## The "Framework-Developer"

A good software developer can apply those concepts and techniques within **any** framework. Learning a framework for the regular every day usage is nothing extraordinary and hard to master. It is just remembering an API and to follow some conventions. It's a repetitive exercise until you remember the necessary things. If you understand patterns you'll be also quicker in getting into the different frameworks.

Writing clean and maintainable code, being aware of best practices and principles, good testing skills, all of this contributes much more to good software than knowing a framework. It is fair that they want somebody who knows a framework, because the perception is that his person will be quickly able to start working. Yes, this is very likely true, but will this person contribute to improve the system or just continue the status quo?

In my opinion, companies looking for good developers, should ask for the before mentioned areas and only then for the framework.

---

It is interesting how many developers don't know or try to find reasons to not use fundamental and proven principles in our industry.

Every profession has chores, there will be always tasks that are no fun or at least not fun for many while others might even like them. Testing is probably an infamous example for that.

I do not think that the ability to use an arbitrary programming language actually enables somebody to properly write software. Anyone who can write in a given language understands the grammar and words, but not everybody will be able to write elegant, well formulated, yet understandable sentences. If you do not plan to become a professional writer, author or bard, the lack of these skills is totally fine and not needed.

I really do not like the idea of considering developers as "code monkeys", the industry and education system needs to enable them accordingly to be more than just code producing "code monkeys" that need an accurate plan, class diagram, to build a system that fulfills certain quality attributes.

Some people want to write just code. This is perfectly fine if you do it for fun and do not plan to show your code as reference during a job interview. In an environment that has a decent level of quality and best practice expectations, this mindset is not working any longer.

Tests are a fundamental part of the profession, design principles don't exist for fun but to solve certain, recurring problems. They've got their names so we are able to communicate the solution with a simple name instead of explaining a whole concept.

It would probably be fun to have a programming language that actually enforces tests to compile.

It should be in the very interest of every entity that has the goal to earn money with software to deliver quickly and to deliver high quality. Therefore any business should be interested in proper development processes, use of principles, design patterns and testing procedures.

## How do you motivate people to intrinsically get used to those concepts?

[1]: [Effect of SOLID Design Principles on Quality of
 Software: An Empirical Assessment](https://www.ijser.org/researchpaper/Effect-of-SOLID-Design-Principles-on-Quality-of-Software-An-Empirical-Assessment.pdf), Harmeet Singh, Syed Imtiyaz Hassan
[2]: [An Experimental Evaluation of the Effect of SOLID Principles to
Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528), Ömer Özgür TANRIÖVER