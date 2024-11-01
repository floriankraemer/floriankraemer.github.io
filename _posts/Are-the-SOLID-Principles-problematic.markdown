## My SOLID History

I have never really heard about them, nor had anyone taught me the principles before this.

What happened was that I've requested an external code review for the company I was working for at this time, which was luckily granted by the CTO.

So the outcome of the meeting we had with the auditor was, at least for me personally as the main driver of the whole software, not so great. I don't remember the exact wording but it was something along the lines of "Its OK, but I've seen better.".

So, this was a little shocking to me and I've asked for a few reasons and how to improve it. One of the things named were the SOLID principles.

I had to let the whole thing sack for around two weeks until I've digested the whole scope of suggestions and improvements. Not because of the quantity or the critic but to really understand what I was told.

I think it still took me quiet some time to get used to the principles, because I was spending most of the time trying to understand them on my own.

However, after I've understood what I was told, my code became **a lot** better. Not only because of the principles but they were very useful.

What I find sad is that I haven't had been taught them during my professional training, nor by any professional nor by any teacher or mentor I've encountered until this time.

I've recently asked around and to my surprise, it looks like the principles are still not widely taught for some reason. Why is that?

In my opinion, the SOLID principles should be taught and trained as part of a professional training and at the University.

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

So, if you are not already familiar with them, would you say they they are easy to understand? I think the answer should be no. Even if you are already capable of writing code you probably will struggle with those sentences.

### How to learn them the best?

By practicing them. Reflect on your own doing and if you are in the position that you have somebody to mentor you ask this person for help.

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

There is empirical evidence [1] that the SOLID principles improve the code quality and associated quality attributes.

The following quote is taking from the conclusion section of the study:

> “This work shows that SOLID design principles increase the maintainability of the code, generally reduce complexity of the code and reduce dependency, providing flexibility to the code. Design principles improve the separation of concern through weaker coupling and stronger cohesion. However, if these principles are applied without measure then some potentially undesirable consequences may occur.”

## Use of AI to find SOLID Violations

AI is doing a surprisingly good job to find (most of the time) and explain when SOLID principles aren’t followed. But **don’t blindly trust the AI**! If the reasoning or code provided by the AI makes no sense or you have doubts about it, don’t take its response seriously!

[1] [An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528) by Osman TURAN