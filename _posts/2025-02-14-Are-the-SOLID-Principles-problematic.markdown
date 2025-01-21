---
layout: post
title: 'Are the SOLID Principles problematic?'
categories: software-architecture
tags:
  - software-architecture
  - solid-principles
date: 2025-02-14T20:43:22.000Z
draft: true
comments: true
---

The article attempts to define what a software principle is, how they should be used, if the SOLID principles are unambiguous and useful and if they are hard to understand and learn.

Before I'll go into what the article is about I'll give you some historical context that also explains my motivation and thought process behind this article. Feel free to skip the story if you aren't interested in this part.

## My SOLID Story

I had never really heard about them, nor had anyone taught me the principles before this. What happened was that I've requested an external code review for the company I was working for at this time, which was luckily granted by the CTO. Originally I wanted to get [Matthias Noback](https://matthiasnoback.nl/), but he was already booked and busy at this time so he recommended us [Ross Tuck](https://www.rosstuck.com/).

The outcome of the meeting we had with Ross was, at least for me personally as the main driver of the whole project, not so great. I don't remember the exact wording but it was something along the lines of "Its OK, but I've seen better.". This was a little shocking for me and I've asked for a few reasons and how to improve it. One of the things named were the SOLID principles.

I had to let the whole thing sack for around two weeks until I've digested the whole scope of suggestions and improvements. Not because of the quantity or the critic but to really understand what I was told. I think it still took me quiet some time to get used to the principles, because I was spending most of the time trying to understand them on my own.

However, after I've understood what I was told, my code became **a lot** better. Not only because of the principles but they were very useful. One year later I've sent Ross a message to thank him for his feedback. Sure, he got paid for it, but I really appreciated the value it had for me personally.

What I find sad is that I haven't had been taught them before and much earlier during my professional training, nor by any professional nor by any teacher or mentor I've encountered until this time. I've recently asked around and to my surprise, it looks like the principles are still not widely taught for some reason. Why is that?

In my opinion, the SOLID principles should be taught and trained as part of a professional training and at the University. Their definitions might sound scary but I don't think they are complicated, lets dive into this.

## Definition of "Principle"

First lets see what the broader concept and meaning of a principle is.

The [Cambridge dictionary](https://dictionary.cambridge.org/dictionary/english/principle) defines a principle as:

> "*A basic idea or rule that explains or controls how something happens or works.*"

The [Oxford dictionary](https://www.oxfordlearnersdictionaries.com/definition/english/principle) defines as principle as:

> "*A principle may relate to a fundamental truth or proposition that serves as the foundation for a system of beliefs or behavior or a chain of reasoning. They provide a guide for behavior or evaluation.*"

### Definition of "Software Principle"

I think it is fair to draw the following conclusions from that Software principles are **not absolute** and **require situational judgment**, which I think can be expected from developers at some level. While in some scenarios, there can be a controversial discussion on if and what principle applies, but in most cases there are obvious and clear violations of the principles to find that are unambiguous.

In my opinion, those should be found by anyone who is familiar with the principles. Some controversial cases require more experience and judgment but *should* be found and decided by more experienced developers.

## The five SOLID Principles

If you already know them you can skip this section and scroll down to the section that discusses the validity of them.

The SOLID principles are a set of principles that were defined over time by different people and turned out to be useful principles in software development.

For the sake of providing a cohesive reading experience and convenience, here are the principles. I've linked them to the according Wikipedia articles if you want to read a more lengthy and detailed explanation of them, which is not needed for this article.

1. **[Single Responsibility Principle (SRP)](https://en.wikipedia.org/wiki/Single-responsibility_principle)**
   "A class should have only one reason to change." - [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin), 2003 [Agile Software Development, Principles, Patterns, and Practices](https://www.amazon.de/-/en/Software-Development-Principles-Patterns-Practices/dp/1292025948)
2. **[Open/Closed Principle (OCP)](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)**
   "Software entities should be open for extension, but closed for modification." - Bertrand Meyer, 1988 [Object-Oriented Software Construction](https://en.wikipedia.org/wiki/Object-Oriented_Software_Construction)
3. **[Liskov Substitution Principle (LSP)](https://en.wikipedia.org/wiki/Liskov_substitution_principle)**
   "Subtypes must be substitutable for their base types." - Barbara Liskov, 1987, Keynote "Data abstraction and hierarchy"
4. **[Interface Segregation Principle (ISP)](https://en.wikipedia.org/wiki/Interface_segregation_principle)**
   "Prefer many specific interfaces over a single general-purpose one."" - Robert C. Martin while consulting Xerox.
5. **[Dependency Inversion Principle (DIP)](https://en.wikipedia.org/wiki/Dependency_inversion_principle)**
   "Depend on abstractions, not on concrete implementations." - No clear origin.

If you are not already familiar with them, would you say they are easy to understand? I think the answer is very likely no. Even if you are already capable of writing code you probably will struggle with those sentences. I would agree if people, who just read those 5 lines, will say that the principles are ambiguous. They are not in my opinion, but this limited information makes them look like they are.

If people are still motivated and not scared away by those sentences, they'll face a plethora of articles that try to explain them. Some seem like copies of others, and many of those aren't good either, in my personal opinion, because they are either to abstract or to simple. I also do not think that code examples are the best way to explain them because its about understanding concepts, that then result in an implementation. So code is basically already showing a concrete solution.

### A Code free Explanation attempt of SOLID

I don't think that code examples are the most beneficial way to explain the principles, mostly because they just show an implementation or application but not necessarily the thought process and decisions that went into them. Therefore, I'll try to provide some examples in just human language.

**SRP**: If two things do different things, separate them into different classes. A discount calculation must not be done within a repository class because the only responsibility of the repository is to fetch data. Assuming you have a shopping cart, should the tax and discount calculation be part of the same class? No, because they do different things.

**OCP**: It is often explained as a plugin system in other articles, but this is about more than just plugin systems: If your discount calculation code is separated from the shopping cart code, it not only fulfills the SRP principle but also the OCP principle. You won't have to directly modify the shopping cart; you can modify it through the discount calculator instance passed to it.

**LSP**: Your discount and tax calculators should be replaceable without changing the actual behavior. A good example of behavior is when one discount calculator throws an exception if it results in a negative total, while another one handles it correctly and returns a total of 0.00. They behave differently and are not valid substitutions. The exception would force the shopping cart to change because it would now have to catch an exception.

**ISP**: Assuming you have tax and discount calculations within the same "ShoppingCart" class, it not only violates SRP but also the LSP principle: You should define two classes or interfaces for each of the responsibilities. This way, discounts and tax calculations can evolve independently and can also be optionally used.

**DIP**: If our cart depends on a concrete implementation of, let's say, a "MariaDbRepository," it would depend on a lower-level element and that concrete implementation, likely coming from the infrastructure and persistence layer. To invert the dependency, the shopping cart business layer would declare a "ShoppingCartRepositoryInterface" instead, which would then be implemented by a concrete class within the persistence layer. Your shopping cart module is now independent of a specific framework or persistence implementation.

## Validity of the SOLID Principles

There is empirical evidence by multiple studies [1][2][3][4], that the SOLID principles improve the code quality and associated quality attributes.

The following quote is taking from the conclusion section of the study "*An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics (2018)*" [1]:

> “*This work shows that SOLID design principles increase the maintainability of the code, generally reduce complexity of the code and reduce dependency, providing flexibility to the code. Design principles improve the separation of concern through weaker coupling and stronger cohesion. However, if these principles are applied without measure then some potentially undesirable consequences may occur.*”

From the study "*An Experimental Assessment on Effects of Solid Design Principles on the quality of Software using CKJM Metric Analysis (2022)*" [3]:

> "*It can be stated that the application of these SOLID design Principles together could lead us to create a highly maintainable and scalable system. The research demonstrates the empirical assessment of a Software application against the Design approach and evaluates the quality of software using CKJM matrices. For our sample application, we have **reduced the coupling by 59%** (approx.) and **introduced the cohesion by 39%** (approx.).*"

Also from that study:

> "*Software Design should be based on Solid principles so that it would be effortless to reuse and scale the amenities.*"

What I like especially about this study [3] is that they've used easily measurable metrics to assess the before and after state of the code. A tool to measure the JCKM metrics mentioned in the quote above can be found [here](https://github.com/dspinellis/ckjm) for Java.

This quote from the study "*Effect of SOLID Design Principles on Quality of Software: An Empirical Assessment (2015)*" [4] looks remarkably similar to the one before, but it is from another study. I've briefly checked if there are more parts that similar, but it looks like this is the only one. What is interesting is that that the results are also very similar and show the positive impact of the SOLID principles.

> "*It can be stated that the application of these SOLID design Principles together could lead us to
create a highly maintainable and scalable system. The research demonstrates the empirical assessment of a Software application against the Design approach, and evaluates the quality of software using CKJM matrices. For our sample application we have **reduced the coupling by 69%** (appox.) and **introduce the cohesion by 29%** (approx.).*"

## Criticism and Pragmatism

Of course there is almost nothing that is purely black and white, and so there are shades of grey in the application of the principles as well.

From "An Experimental Assessment on Effects of Solid Design Principles on the quality of Software using CKJM Metric Analysis" [3]:

> "*Solid  design principles are just principles, not rules.  It’s not  a compulsion to  apply SOLID principles in  even a small codebase.  It  becomes a  necessity  while  dealing with  a large codebase. Always use common sense while applying SOLID. For the sake of SRP, must avoid over-fragmenting of code.*"

This confirms what I wrote before, that one needs to judge each case based on a holistic understanding of the impact on the system. SOLID for the sake of SOLID is as wrong as blindly applying any principle.

Also from the same study [3]:

> "Do not aim to attain SOLID, use Solid to attain maintainability. Solid design principles are just principles, not rules."

### Stay pragmatic: Analyze and judge your Case

Let's assume you have an aggregate (in the context of DDD) and you add annotations or attributes (depending on your language features) to the aggregate to enable it to be used by a persistence system as well. Very strictly seen you could argue, that you've just broken the SRP. Is it bad in this case? Well, it depends. The overall system has to be understood, its goals and quality attributes, to answer that question.

Another, often done and also very similar case, is the use of validation rule annotations or attributes on data transfer objects or even on persistence entities or domain entities. The answer is again an "it depends" on the context. For a simple CRUD application this is very likely good. If you have a system modelling social benefits or tax laws, it is very likely ending up in a hard to maintain system. Regarding the topic of where to do validation [check my other article](2024-02-16-About-Validation-and-Anti-Corruption-Layers.markdown) I wrote specifically about this topic.

### How to learn them the best?

By practicing them. Reflect on your own doing and if you are in the position that you have somebody to mentor you ask this person for help.

If you are unsure and you don't have an experienced person helping you, metrics that measure cohesion and coupling might help you to compare your before and after state base on a measurement. The only danger here is that you might over-engineer and just go by the numbers to make them smaller. Try to think about the impact of the changes you make as a whole and not apply the principles dogmatically. For training reasons you could of course go and over-engineer as much as you can, to explore how far you could go.

<!--

### LSP Violation Example

This principle addresses **unintended changes of behavior in sub types**. Given we have two classes, Alpha and Beta, both extending an abstract base class or implementing the same interface, getPositiveInteger() as follows, it will break the behavior, despite being valid code:

```java
class Alpha implements PositiveIntegerProvider {
    @Override
    public int getPositiveInteger() {
        return 2 + 2;
    }
}

class Beta implements PositiveIntegerProvider {
    @Override
    public int getPositiveInteger() {
        int result = 2 - 4;
    }
}
```

Even the type check here does not prevent a change in behavior by returning a negative number in this case. Solutions:

1. Return a value object "PositiveNumber" as data type, that does the check internally and does not accept negative values. Bonus: This also communicates intent and also fulfills SRP. You can immediately tell by the name of the type what it does.

2. Declare a "@throws NegativeResultException" in the docblock of the interface or parent class and hope (or enforce it via an architectural rule checker) everyone implements it or the static analyzer is capable of finding that it is not thrown.

```java
// Throws exception from value object
public PositiveInteger getPositiveInteger()
{
    return PositiveInteger::fromInteger(2 - 4);
}
```

It should be impossible, at least much harder, to change the behavior of the method to an unintended behavior now.

-->

## Use of AI to find SOLID Violations

AI is doing a surprisingly good job (most of the time) of identifying and explaining when SOLID principles aren’t followed. But don’t blindly trust the AI. At the time of writing, AI is good at finding violations, but it is not perfect! If the reasoning or code provided by the AI makes no sense or raises doubts, don’t take its response seriously! I'm mostly using ChatGPT, but I assume you'll get similarly good results with other AIs like Claude AI.

Even without giving it a lengthy prompt, I often get good results by simply specifying the programming language and asking it to refactor or explain a single method or a whole class based on the SOLID principles.

## Conclusion

The article should have demonstrated that SOLID principles are useful and often relatively easy to identify and address. Furthermore, the papers mentioned in this article have shown that analyzer tools can help measure the actual impact of applying the SOLID principles. This means you can not only make improvements but also measure those improvements.

Something I haven’t been able to find a clear answer to is why the SOLID principles aren’t more widely taught and adopted. I still believe they are relatively simple to learn—perhaps not so easy to master—but given their impact on code quality, they’re worth the effort. Why aren’t they taught more frequently? Whether in schools, universities, or companies? Especially companies, as they should have a vested interest in improving code quality, flexibility, and maintainability to reduce the costs of software development and maintenance.

To further explore the real-world usage of SOLID principles, I’ll attempt to conduct a survey and publish the results here.

## References

- [1] [An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528) by Osman Turan, Ömer Özgür, 2018
- [2] [Investigating the Impact of SOLID Design Principles on Machine Learning Code Understanding](https://arxiv.org/pdf/2402.05337) by Raphael Cabral, Hugo Villamizar, Marcos Kalinowski, Tatiana Escovedo, Maria Teresa Baldassarre, Hélio Lopes Rio de Janeiro, 2024
- [3] [An Experimental Assessment on Effects of Solid Design Principles on the quality of Software using CKJM Metric Analysis](https://www.ijraset.com/research-paper/an-experimental-assessment-on-effects-of-solid-design) by Bhaumik Tyagi, Yusra Beg, 2022
- [4] [Effect of SOLID Design Principles on Quality of Software: An Empirical Assessment](https://www.ijser.org/researchpaper/Effect-of-SOLID-Design-Principles-on-Quality-of-Software-An-Empirical-Assessment.pdf) by Harmeet Singh, Syed Imtiyaz Hassan, 2015
