---
layout: post
title: 'Cognitive vs. Semantic Understanding of Code'
categories: software-architecture
tags:
    - software-architecture
    - cognitive-complexity
    - code-quality
    - domain-driven-design
    - ubiquitous-language
    - semantics
draft: true
published: true
comments: true
date: 2026-10-21T10:13:51.000Z
---

I recently shared my Cognitive Code Analysis Tool for PHP[^cognitive-code-analysis] (there is a Java[^cognitive-code-analysis-java] and C#[^cognitive-code-analysis-csharp] version as well) on [LinkedIn](https://lnkd.in/p/epdmSbNA) and got a very good question in the comments:

> Does it look at naming quality or patterns, or is that intentionally left out because it is harder to formalize than structure?

It (semantics) was intentionally left out, and the reason is worth a longer explanation, because it touches the difference between the *cognitive* and the *semantic* level of understanding code.

## What the Tool Does

The tool measures the structure of your methods: the number of lines, arguments, return statements, variables and property accesses, and how many `if` and `else` branches there are and how deeply they are nested. From these metrics it calculates a cognitive complexity score per method. It is basically just counting things.

You may already use the cognitive score from SonarQube[^sonar-cognitive], but that one is calculated a little differently.
Also, the score is not the same as Cyclomatic Complexity[^cyclomatic] or Halstead Complexity[^halstead]. Cognitive complexity measures how hard it is for a human to understand the code, while cyclomatic complexity measures how hard your code is to test.

Why does it matter? Well, understanding code is expensive and something we do most of the time.
Roughly 80% of the time is spent on reading and understanding code.
And it is also more expensive for AI agents to work with low-quality, hard-to-comprehend code. I'll get back to this point later on.

## Why Semantics Is Left Out

It is intentionally left out from the cognitive analysis because it is very hard to get useful results from that approach, and it is not related at all to cognition.

Cognitive analysis is easy to do; it is easy to understand why it reported something, and it usually is good enough to find the worst code parts in an application pretty quickly. It is purely based on the idea of the limits of human cognition.

When you refer to naming quality or patterns, you get into a very different terrain.
First of all, we would have to define what "quality" means in this context.
I've experimented with a few approaches, but I never got satisfying results by trying to analyze words alone and trying to find heuristics. 

However, the goal of semantic analysis is a totally different one than the one of cognitive analysis.

## Just Words Are Not Semantic

The follow-up suggestion was: 

> if the goal is lower cognitive load, limit the number of words or the length of method names, and flag generic names like `$data`, `$tmp`, `$result` or `$manager`. Quite deterministic and easy to explain.

Unfortunately, it is not that easy. Words in isolation are just strings of characters or sounds. They only gain semantics (meaning) through context. You will have to infer intent, meaning and concepts from them. This is not easy, even for an AI, because it needs to know the actual context of the environment. 

I would recommend everyone to peek into DDD and the concept of the ubiquitous language[^ubiquitous-language]. The ubiquitous language is the shared vocabulary that developers and domain experts use for one specific part of the business, and the code uses exactly the same words with exactly the same meaning. Something can have the same four letters, but a totally different meaning in another context.

The classic "User" can be something *very* different. A "Nurse" and a "Doctor" are both a "User" of a system, but with very different roles and concepts. A nurse will never perform a surgery.

The classic mistake here is to model something like `User.performSurgery()` vs. `Surgeon.performSurgery()`. Your `Nurse` object simply should never provide this method. This is just an example, but you get the idea. If something is different, give it a different model based on its behavior and capabilities.

The generic `User` has to guess who is allowed to do what, so every capability needs a role check:

{% tabs semantic-user %}

{% tab semantic-user PHP %}
```php
<?php

// One generic "User": every role gets every capability
final class User
{
    public function __construct(private readonly Role $role) {}

    public function performSurgery(Patient $patient): void
    {
        if ($this->role !== Role::Surgeon) {
            throw new DomainException('Only a surgeon can perform a surgery.');
        }

        // ...
    }
}
```
{% endtab %}

{% tab semantic-user C# %}
```csharp
// One generic "User": every role gets every capability
public class User
{
    private readonly Role _role;

    public User(Role role) => _role = role;

    public void PerformSurgery(Patient patient)
    {
        if (_role != Role.Surgeon)
            throw new DomainException("Only a surgeon can perform a surgery.");

        // ...
    }
}
```
{% endtab %}

{% tab semantic-user Java %}
```java
// One generic "User": every role gets every capability
public class User {
    private final Role role;

    public User(Role role) {
        this.role = role;
    }

    public void performSurgery(Patient patient) {
        if (role != Role.Surgeon) {
            throw new DomainException("Only a surgeon can perform a surgery.");
        }

        // ...
    }
}
```
{% endtab %}

{% endtabs %}

Two models named after the real concepts do not need the check, because a `Nurse` simply has no way to perform a surgery:

{% tabs semantic-roles %}

{% tab semantic-roles PHP %}
```php
<?php

final class Nurse
{
    public function administerMedication(Patient $patient, Medication $medication): void
    {
        // ...
    }
}

final class Surgeon
{
    public function performSurgery(Patient $patient): void
    {
        // ...
    }
}
```
{% endtab %}

{% tab semantic-roles C# %}
```csharp
public class Nurse
{
    public void AdministerMedication(Patient patient, Medication medication)
    {
        // ...
    }
}

public class Surgeon
{
    public void PerformSurgery(Patient patient)
    {
        // ...
    }
}
```
{% endtab %}

{% tab semantic-roles Java %}
```java
public class Nurse {
    public void administerMedication(Patient patient, Medication medication) {
        // ...
    }
}

public class Surgeon {
    public void performSurgery(Patient patient) {
        // ...
    }
}
```
{% endtab %}

{% endtabs %}

By doing so, you'll also follow the SPR principle from the SOLID principles. You'll get a smaller, easier to test object. An object should do one thing or take one responsibility. In this case it is to model a nurse. Not a surgeon, not a super generic, almighty "User".

Also, a longer method name can be better than a shorter one, if it helps to communicate the actual function and purpose of the method. Compare `setStatus()` with `deactivate()`, `reactivate()` and `activate()`.
I can use `setStatus()` and pass an enum, but the three methods describe the actual behavior through the public interface of the object and therefore make its capabilities easier to understand.

{% tabs semantic-status %}

{% tab semantic-status PHP %}
```php
<?php

enum Status
{
    case Pending;
    case Active;
    case Deactivated;
}

// Generic: any caller can set any status, and every caller has to know the rules
$account->setStatus(Status::Deactivated);

// Expressive: the method name is the business operation, the rules live in one place
final class Account
{
    private Status $status = Status::Pending;

    public function activate(): void
    {
        if ($this->status !== Status::Pending) {
            throw new DomainException('Only a pending account can be activated.');
        }
        $this->status = Status::Active;
    }

    public function deactivate(): void
    {
        if ($this->status !== Status::Active) {
            throw new DomainException('Only an active account can be deactivated.');
        }
        $this->status = Status::Deactivated;
    }

    public function reactivate(): void
    {
        if ($this->status !== Status::Deactivated) {
            throw new DomainException('Only a deactivated account can be reactivated.');
        }
        $this->status = Status::Active;
    }
}

$account->deactivate();
```
{% endtab %}

{% tab semantic-status C# %}
```csharp
public enum Status
{
    Pending,
    Active,
    Deactivated
}

// Generic: any caller can set any status, and every caller has to know the rules
account.SetStatus(Status.Deactivated);

// Expressive: the method name is the business operation, the rules live in one place
public class Account
{
    private Status _status = Status.Pending;

    public void Activate()
    {
        if (_status != Status.Pending)
            throw new DomainException("Only a pending account can be activated.");
        _status = Status.Active;
    }

    public void Deactivate()
    {
        if (_status != Status.Active)
            throw new DomainException("Only an active account can be deactivated.");
        _status = Status.Deactivated;
    }

    public void Reactivate()
    {
        if (_status != Status.Deactivated)
            throw new DomainException("Only a deactivated account can be reactivated.");
        _status = Status.Active;
    }
}

account.Deactivate();
```
{% endtab %}

{% tab semantic-status Java %}
```java
public enum Status {
    Pending,
    Active,
    Deactivated
}

// Generic: any caller can set any status, and every caller has to know the rules
account.setStatus(Status.Deactivated);

// Expressive: the method name is the business operation, the rules live in one place
public class Account {
    private Status status = Status.Pending;

    public void activate() {
        if (status != Status.Pending) {
            throw new DomainException("Only a pending account can be activated.");
        }
        status = Status.Active;
    }

    public void deactivate() {
        if (status != Status.Active) {
            throw new DomainException("Only an active account can be deactivated.");
        }
        status = Status.Deactivated;
    }

    public void reactivate() {
        if (status != Status.Deactivated) {
            throw new DomainException("Only a deactivated account can be reactivated.");
        }
        status = Status.Active;
    }
}

account.deactivate();
```
{% endtab %}

{% endtabs %}

## Cognitive vs Semantic Code Analysis

Cognitive limits are about how much we can keep in short-term memory. Semantics is about understanding the meaning of the words.

The best you can get from analyzing words is a distribution of words across a code base, but depending on the design of the code base you'll get deceptive results. You can have really bad code: if your 6000-line controller has all your "Order" logic inside, this looks "fine", because it's all in one place, right? Of course, this will very likely be very messy code if the controller has so many lines. If you keep looking, you'll find "Order" as well in the infrastructure layer (if one exists) or somewhere else. If an application is doing categorization and not, as it should be, grouping by capability, you'll not get anything useful from that approach. Unfortunately, such analysis almost never generated a net benefit for me. Maybe my approach is flawed; I won't rule this out.

I've already experimented with different approaches, but in my opinion there is no better way than actually talking with domain experts and doing Event Storming[^event-storming] when you work in a really complex domain. *It is crucial to understand the problem space before writing code!*

If this understanding never made it into the code by using the idea of the ubiquitous language and well-defined boundaries, you basically have nothing to reconstruct anyway, because you're looking at a mess where words are spread everywhere and have no clear meaning.

### Comparison

| Dimension | Cognitive Analysis | Semantic Analysis |
| :--- | :--- | :--- |
| **Primary Focus** | Structure, control flow, nesting depth, and parameter counts. | Meaning, intent, domain rules, and context of names. |
| **Core Question** | *"How hard is this code for a human or AI to read and hold in short-term memory?"* | *"Does this code accurately model the real-world business domain and its rules?"* |
| **Measurement Method** | Deterministic heuristics and counting (e.g., counting `if/else`, loops, returns, parameters). | Human collaboration, shared understanding, and business modeling (e.g., Event Storming). |
| **Automation Feasibility** | **High** — Easily automated in CI/CD static analysis tools (e.g., SonarQube, custom analyzers). | **Low** — Difficult to automate accurately via simple heuristics or word counts. |
| **Key Benefit** | Quickly identifies **structural** hot spots and overly complex, unmaintainable methods. | Eliminates ambiguity, prevents invalid domain states, and improves long-term system architecture. |

## The Impact on AI

There are so far a few studies ([Wirdemann et al., 2026](https://arxiv.org/abs/2608.18645); [Borg et al., 2026](https://arxiv.org/abs/2601.02200); [Tornhill, 2026](https://codescene.com/blog/unhealthy-code-is-burning-your-token-usage-heres-the-data)) that suggest that code that is easy to understand for humans may also be easier to understand for an AI. Or in other words: You may spend fewer tokens. Even if you don't read all of the code anymore, when you have to, you should be able to understand it easily and quickly.

## Conclusion

Design code for a maximum of comprehensibility on a semantic **and** cognitive level. This, by the way, will also help the AI, as shown in this paper[^codescene-tokens].

In practice, this means using both tools for what they are good at:

- Run a static cognitive analysis regularly, for example in your CI pipeline, to find the methods that overload short-term memory, and refactor the worst ones first.
- Work with domain experts to find the right words and boundaries, and make sure exactly these words end up in your class and method names.
- When you refactor a hotspot, don't just split it into smaller pieces, but name the pieces after the domain concepts they represent.

I'm happy to answer all questions and criticism, or help you interpret results if you want.

---

[^cognitive-code-analysis]: [Phauthentic/cognitive-code-analysis](https://github.com/Phauthentic/cognitive-code-analysis) is the Cognitive Code Analysis Tool for PHP. The repository contains documentation that explains the differences and similarities to other complexity metrics.
[^cognitive-code-analysis-java]: [floriankraemer/cognitive-code-analysis-java](https://github.com/floriankraemer/cognitive-code-analysis-java) is the Java version of the Cognitive Code Analysis Tool.
[^cognitive-code-analysis-csharp]: [floriankraemer/csharp-cognitive-code-analysis](https://github.com/floriankraemer/csharp-cognitive-code-analysis) is the C# version of the Cognitive Code Analysis Tool.
[^sonar-cognitive]: G. Ann Campbell, "[Cognitive Complexity: A new way of measuring understandability](https://www.sonarsource.com/docs/CognitiveComplexity.pdf)" (SonarSource). The white paper behind the cognitive complexity score in SonarQube.
[^cyclomatic]: [Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) counts the number of linearly independent paths through a piece of code. It tells you how many test cases you need to cover all branches, not how hard the code is to read.
[^halstead]: [Halstead complexity measures](https://en.wikipedia.org/wiki/Halstead_complexity_measures) are calculated from the number of distinct and total operators and operands in the code.
[^ubiquitous-language]: Martin Fowler, "[Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html)". The term comes from Eric Evans' book *Domain-Driven Design*.
[^event-storming]: [Event Storming](https://www.eventstorming.com/) is a workshop format by Alberto Brandolini in which developers and domain experts model a business process together as a sequence of domain events.
[^codescene-tokens]: CodeScene, "[Unhealthy code is burning your token usage: here's the data](https://codescene.com/blog/unhealthy-code-is-burning-your-token-usage-heres-the-data)".
 