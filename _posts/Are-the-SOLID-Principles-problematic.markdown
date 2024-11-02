---
layout: post
title: 'Are the SOLID Principles problematic?'
categories: software-architecture
tags:
  - software-architecture
date: 2024-10-03T11:15:30.000Z
draft: false
published: true
comments: true
---

## My SOLID History

Before I'll go into what the article is about I'll give you some historical context that also explains my motivation and thought process behind this article. Feel free to skip the story if you aren't interested in this part.

---

I have never really heard about them, nor had anyone taught me the principles before this. What happened was that I've requested an external code review for the company I was working for at this time, which was luckily granted by the CTO. Originally I wanted to get Matthias Noback, but he was already booked and busy at this time so he recommended us X.

So the outcome of the meeting we had with the auditor was, at least for me personally as the main driver of the whole software, not so great. I don't remember the exact wording but it was something along the lines of "Its OK, but I've seen better.". This was a little shocking to me and I've asked for a few reasons and how to improve it. One of the things named were the SOLID principles.

I had to let the whole thing sack for around two weeks until I've digested the whole scope of suggestions and improvements. Not because of the quantity or the critic but to really understand what I was told. I think it still took me quiet some time to get used to the principles, because I was spending most of the time trying to understand them on my own.

However, after I've understood what I was told, my code became **a lot** better. Not only because of the principles but they were very useful. One year later I've sent X a message to thank him for his feedback. Sure, he got paid for it, but I really appreciated the value it had for me personally.

What I find sad is that I haven't had been taught them before and much earlier during my professional training, nor by any professional nor by any teacher or mentor I've encountered until this time. I've recently asked around and to my surprise, it looks like the principles are still not widely taught for some reason. Why is that?

In my opinion, the SOLID principles should be taught and trained as part of a professional training and at the University. Their definitions might sound scary but I don't think they are complicated, lets dive into this.

## Definition of Principle

A principle is **a fundamental truth or guideline** that **shapes behavior, actions, or thought**. It serves as **a foundational rule or belief that influences decision-making**, providing **consistency and direction**. Principles are often universal and help individuals or groups align their choices with a core set of values or goals. In essence, a principle acts as a baseline for quality, coherence, and purpose in actions or creations.

In one simple sentence: Software engineering principles act as guardrails that steer the development towards certain quality attributes. Those attributes are Readability, Understandability, Simplicity, Flexibility, Maintainability.

## Software Principles

Software principles are **not absolute** and **require situational judgment**, which can be expected from developers at some level. While in some scenarios, there can be a controversial discussion on if and what principle applies, but in most cases there are obvious and clear violations of the principles to find that are unambiguous. Those should be found by anyone who is familiar with the principles. Some controversial cases require more experience and judgment but *should* be found and decided by more experienced senior developers.

## SOLID Principles

For the sake of a cohesive reading experience and convenience: Here are the principles.

1. Single Responsibility Principle (SRP): A class should have only one reason to change.

2. Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.

3. Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types.

4. Interface Segregation Principle (ISP): Prefer many specific interfaces over a single general-purpose one.

5. Dependency Inversion Principle (DIP): Depend on abstractions, not on concrete implementations.

If you are not already familiar with them, would you say they they are easy to understand? I think the answer is very likely no. Even if you are already capable of writing code you probably will struggle with those sentences. I would agree if people, who just read those 5 lines, will say that the principles are ambiguous. They are not in my opinion, but this limited information makes them look like they are.

If people are still motivated and not scared away by those sentences, they'll face a plethora of articles that they to explain them. Some seem like copies of others, and many of those aren't good either, in my personal opinion, because they are either to abstract or to simple.

### How to learn them the best?

By practicing them. Reflect on your own doing and if you are in the position that you have somebody to mentor you ask this person for help.

If you are unsure and you don't have an experienced person helping you, metrics that measure cohesion and coupling might help you to compare your before and after state base on a measurement. The only danger here is that you might over-engineer and just go by the numbers to make them smaller. Try to think about the impact of the changes you make as a whole and not apply the principles dogmatically. For training reasons you could of course go and over-engineer as much as you can, to explore how far you could go.

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

## Validity of the SOLID Principles

There is empirical evidence by multiple studies [1][2][3] that the SOLID principles improve the code quality and associated quality attributes.

The following quote is taking from the conclusion section of the study:

> “*This work shows that SOLID design principles increase the maintainability of the code, generally reduce complexity of the code and reduce dependency, providing flexibility to the code. Design principles improve the separation of concern through weaker coupling and stronger cohesion. However, if these principles are applied without measure then some potentially undesirable consequences may occur.*”

...

> "*It can be stated that the application of these SOLID design Principles together could lead us to create a highly maintainable and scalable system. The research demonstrates the empirical assessment of a Software application against the Design approach and evaluates the quality of software using CKJM matrices. For our sample application, we have **reduced the coupling by 59%** (approx.) and **introduced the cohesion by 39%** (approx.).*"

What I like especially about this study is that they've used easily measurable metrics to assess the before and after state of the code. A tool to measure the JCKM metrics mentioned in the quote above can be found [here](https://github.com/dspinellis/ckjm) for Java.

### Criticism and Pragmatism

Of course there is almost nothing that is purely black and white, and so there are shades of grey in the application of the principles as well.

> "*Solid  design principles are just principles, not rules.  It’s not  a compulsion to  apply SOLID principles in  even a small codebase.  It  becomes a  necessity  while  dealing with  a large codebase. Always use common sense while applying SOLID. For the sake of SRP, must avoid over-fragmenting of code.*"

## Use of AI to find SOLID Violations

AI is doing a surprisingly good job to find (most of the time) and explain when SOLID principles aren’t followed. But **don’t blindly trust the AI**! If the reasoning or code provided by the AI makes no sense or you have doubts about it, don’t take its response seriously!

[1] [An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528) by Osman Turan, Ömer Özgür.
[2] [Investigating the Impact of SOLID Design Principles on Machine
Learning Code Understanding](https://arxiv.org/pdf/2402.05337)
[3] [An Experimental Assessment on Effects of Solid Design Principles on the quality of Software using CKJM Metric Analysis](https://www.ijraset.com/research-paper/an-experimental-assessment-on-effects-of-solid-design) by Bhaumik Tyagi, Yusra Beg.